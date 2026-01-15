# Snapshot: Separation of Concerns (Dual Pipeline) Audit & Plan

**Time**: 2026-01-13 19:42
**Context**: Deep analysis of `flow-content-script.js` revealing critical coupling issues between Image and Video generation logic, leading to regression bugs.

## 🚨 The Diagnosis: "Spaghetti Coupling"

The current implementation in `flow-content-script.js` is dangerously coupled.
- **Problem 1: Unified Monolith**
    - Both Image Logic and New Video Logic reside in the SAME file, sharing same helper functions.
    - `handleWaitResultState` is a 200-line monster handling both logic paths via `if (mode === 'video')`.
    - `SELECTORS` object is a shared global dump, increasing collision risk.
- **Problem 2: Fragile shared helpers**
    - `configureSettings` is hardcoded for Image mode (Portrait 9:16) but might be called in Video mode context unintentionally.
    - `findElement` and logging are tightly bound to the script's scope.
- **Problem 3: State Machine as a Sidekick**
    - The State Machine (`flow-state-machine.js`) is just a skeleton. It delegates *back* to the content script functions, creating a circular dependency where the content script overwrites window globals.

## 🛠 The Master Plan: "Strict Separation" Service Architecture (V3)

We will break the monolith into **4 Distinct Layers** with a clean, descriptive folder structure.

### 📂 Proposed Folder Structure
```text
projects/tiktok-shop-automation/
├── 📂 core/                # Layer 1 & 2: Shared & Schema
│   ├── dom.js              # DOM utilities
│   ├── logger.js           # Logger
│   ├── utils.js            # (NEW) Generic helpers (sleep, random)
│   └── schema.js           # (NEW) Data Models (Product, State)
│
├── 📂 features/            
│   └── 📂 google-flow/     # Layer 3 & 4: Logic Orchestration
│       ├── main.js         # Entry point (Message listener)
│       ├── state-machine.js# Orchestrator
│       ├── behavior.js     # Human behavior patterns
│       └── 📂 services/    # Domain Logic
│           ├── image-gen.js# Image specific logic
│           └── video-gen.js# Video specific logic
│
├── 📂 background.js        # Global worker
├── manifest.json
└── ...
```

### Layer 1: Core (Shared Utilities)
*Files:*
- `core/dom.js`: DOM interaction logic only.
- `core/logger.js`: Unified logging system.
- **`core/utils.js` (NEW)**: Move generic helper functions here (sleep, random, math).

### Layer 2: Data Models & Schema
*Files:*
- **`core/schema.js` (NEW)**: Define the "Consensus Schema".
    - `Product`: (id, name, characterImg, productImg, imagePrompt, videoPrompt).
    - `AutomationState`: (status, currentMode, retryCount, lastResult).
    - `FlowResult`: (generatedImageUrl, generatedVideoUrl).

### Layer 3: Domain Services (The Split)
*Files:*
- **`google-flow/services/image-gen.js`**: Pure logic for Text-to-Image.
- **`google-flow/services/video-gen.js`**: Pure logic for Frames-to-Video.

### Layer 4: The Orchestrator (State Machine)
*File:* `google-flow/state-machine.js`
- Routes execution based on `currentMode` using the standard `AutomationState`.

## 🔄 Refactoring Phases

### Phase 1: Directory Reorganization & Schema Extraction
- Rename `feature-c-google-flow` to `google-flow`.
- Create `services/` and `core/utils.js`.
- Define `core/schema.js` for data integrity.

### Phase 2: Image Service Isolation
- Move Image logic to `services/image-gen.js`.
- Adapt logic to use `schema.js` definitions.

### Phase 3: Video Service Isolation
- Move Video logic to `services/video-gen.js`.
- Finalize "Frames to Video" implementation.

### Phase 4: Integration & Manifest Sync
- Simplify `main.js` (formerly `flow-content-script.js`).
- Update `manifest.json` load order.
- **Verification**: Build Pass & E2E Validation.

## 🏁 Definition of Done
- Organized folder structure as proposed.
- No `SyntaxError` or cross-logic leakage.
- Data structures are strictly defined in `schema.js`.
- Build passes 100%.
