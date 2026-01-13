# Deep Diagnostic Report: Legacy vs New Architecture
## Comparative Analysis & Root Cause Diagnosis

**Time**: 2026-01-13 22:10 GMT+7
**Status**: CRITICAL FINDINGS - Architecture Misunderstanding Identified
**Analyst**: Oracle Keeper

---

## Executive Summary (TL;DR)

### ❌ ปัญหาหลัก: **Catastrophic Misunderstanding of Legacy Architecture**

**What We Got Wrong**:
เราเข้าใจว่า Legacy Code มี "หลาย handler functions" (Image vs Video)
แต่ **จริงๆ Legacy มีแค่ 3 handler หลัก** ที่ทำทั้ง Image และ Video ด้วยกันใน IF/ELSE

**Refactoring Error**:
- เราเอา Logic มาแบ่งเป็น Service ละเอียด (ImageService, VideoService)
- แต่ลืมว่า Original Logic มันมีสถานะ (state) และ selector ที่ shared กัน
- ตอนแบ่งออก เราไม่ได้ copy ทั้งหมด → Missing pieces

**Result**:
```
Legacy (MONOLITHIC - ทำงานได้):
  flow-content-script.js (2,040 lines)
  ├─ handleStartState() ← Entry Point
  ├─ handleImageStartState() ← Image + Video ถูกควบคุมที่นี่
  ├─ handleFillImagesState() ← Image & Video sharing
  ├─ handleGenerateState() ← Image & Video sharing
  └─ All logic in 1 file

New (SOA - แตกหมด):
  flow-content-script.js (1,800 lines) - Removed handlers
  services/image-gen.js - Image only (missing Video logic)
  services/video-gen.js - Video only (missing Image logic)
  └─ Broken references between files
```

---

## Part 1: Legacy Architecture Deep Dive

### 1.1 Script Loading Order (manifest.json)

```json
Content Scripts for https://labs.google/* :
1. core/logger.js          ← Logger utility
2. core/dom.js             ← DOM helpers (waitForElement, etc.)
3. human-behavior.js       ← Sleep, wander (human simulation)
4. flow-state-machine.js   ← State orchestration (860 lines)
5. flow-content-script.js  ← ALL Business Logic (2,040 lines)
```

**Key Insight**: `flow-content-script.js` loads LAST and contains ALL state handlers

### 1.2 Legacy Handler Architecture (What Actually Exists)

**Handler Count**: Only 3 Main Handlers

| Handler | Lines | Purpose | Image? | Video? |
| :--- | :--- | :--- | :--- | :--- |
| `handleStartState()` | 1197-1217 | Route to Image/Video | ✓ | ✓ |
| `handleImageStartState()` | 1217-1273 | Image + Video START | ✓ | ✓ |
| `handleVideoStartState()` | 1273-1320 | Video START | - | ✓ |
| `handleFillImagesState()` | 1320-1453 | Fill images (shared) | ✓ | ✓ |
| `handleFillPromptState()` | 1453-1609 | Fill prompt (shared) | ✓ | ✓ |
| `handleGenerateState()` | 1609-1651 | Generate (shared) | ✓ | ✓ |

**Critical Pattern**: `handleStartState()` is the REAL entry point, not what we called

```javascript
// LINE 1197-1210 in Legacy
async function handleStartState(data) {
  // This is called by state machine
  // It decides: Image or Video?
  if (data.mode === 'video') {
    await handleVideoStartState(data);
  } else {
    await handleImageStartState(data);
  }
}

// handleImageStartState is ALSO for Video! (confusing naming)
// The actual logic:
async function handleImageStartState(data) {
  if (data.mode === 'image') {
    // Create image project
  } else if (data.mode === 'video') {
    // Create video project
  }
}
```

**The Missing Knowledge**: In Legacy, there's NO separation - it's all one big IF/ELSE chain

### 1.3 Legacy Feature Implementation Map

#### Feature 2.1: Pull Data (Product → Character → Caption)

**Files**:
- `content/tiktok-content-script.js` (726 lines) - TikTok modal scraping
- `features/feature-b-gen-compose/content-generator.js` (262 lines) - Content generation logic
- `features/feature-b-gen-compose/openai-client.js` (203 lines) - OpenAI API wrapper
- `features/feature-b-gen-compose/prompt-builder.js` (249 lines) - Prompt templates
- `background.js` (1,177 lines) - State management & orchestration

**Flow**:
```
TikTok Shop Modal
  ↓ (content/tiktok-content-script.js)
  1. Scrape product rows from modal
  2. Extract: productId, name, image, price
  3. Send to background.js via message
  ↓ (background.js)
  4. Call OpenAI API (openai-client.js)
  5. Generate: H1, H2, Caption, Speech, CTA (content-generator.js)
  6. Save to localStorage + return to UI
```

**Key Functions**:
- `tiktok-content-script.js::_scrapeTab()` - Scrape product table
- `tiktok-content-script.js::_parseProductRow()` - Extract product data
- `openai-client.js::createOpenAIClient()` - API client factory
- `content-generator.js` - Content generation prompts
- `background.js::handlePullProducts()` - Orchestrate the flow

#### Feature 2.2: Image Compose (Flow App Automation)
**Functions** (Lines 1320-1453 in flow-content-script.js):
```javascript
handleFillImagesState() {
  // 1. Find image input selectors
  // 2. Upload character image (first add button)
  // 3. Upload product image (second add button)
  // Uses: findAllAddButtons(), uploadImageViaAddButton()
  // This works for BOTH Image and Video mode
}

Key helpers:
- uploadImageViaAddButton()    [Line 560] - Upload via Add button
- findAllAddButtons()          [Line 462] - Find all add buttons
- findAddButtonByIndex()       [Line 479] - Get specific add button
- clickCropAndSave()           [Line 634] - Click crop & save dialog
```

**State Tracking**:
```javascript
const UPLOAD_STATE_KEY = 'googleFlow_uploadState';
function getUploadedImages() { /* sessionStorage */ }
function setUploadedImages() { /* sessionStorage */ }
```

#### Feature 2.3: Video Generate
**Functions** (Lines 1116-1197, then 1273-1320):
```javascript
uploadStartFrame(imageUrl) {
  // 1. Switch mode to Video (click Tune icon)
  // 2. Upload first frame
  // 3. Wait for completion
}

handleVideoStartState(data) {
  // Routes to video-specific flow
  // Then continues to FILL_IMAGES (same function for both!)
}

switchMode(targetMode) {
  // Click tune icon, select mode
  // Used by both image and video flows
}
```

**Why It Works**: All state handlers are in ONE file with shared utility functions

---

## Part 2: New Architecture Analysis

### 2.1 Current Script Loading Order (manifest.json - NEW)

```json
Content Scripts for https://labs.google/* :
1. core/logger.js
2. core/utils.js            ← NEW: Extracted utilities
3. core/dom.js
4. core/schema.js           ← NEW: Centralized constants
5. human-behavior.js
6. services/image-gen.js    ← NEW: Image Service (620 lines)
7. services/video-gen.js    ← NEW: Video Service (510 lines)
8. flow-state-machine.js    ← Updated for Services
9. flow-content-script.js   ← Gutted of handlers (1,800 lines)
```

### 2.2 New Handler Architecture (What We Created)

**Handlers Split Across Files**:
- `services/image-gen.js`: `handleImageStart`, `handleFillImages`, `handleFillPrompt`, `handleImageGenerate`, `handleImageWaitResult`
- `services/video-gen.js`: `handleVideoStartState`, `handleSwitchModeState`, `handleVideoWaitResult`
- `flow-content-script.js`: **NOW ONLY UTILITIES** (uploadImage, findElement, etc.)

**State Machine Calls**:
```javascript
// flow-state-machine.js line 125
case FLOW_STATES.START:
  if (currentMode === 'video') {
    await window.VideoService.handleVideoStart(data);
  } else {
    await window.ImageService.handleImageStart(data);
  }
```

### 2.3 What We Extracted (Correctly)

✅ **Image Generation Service** (`services/image-gen.js`):
- Function: `handleImageStart()` - Create image project
- Function: `handleFillImages()` - Upload images
- Function: `handleFillPrompt()` - Fill prompt textarea
- Function: `handleImageGenerate()` - Click generate
- Function: `handleImageWaitResult()` - Poll for result
- Constants: `IMAGE_SELECTORS`, image-specific validation

✅ **Video Generation Service** (`services/video-gen.js`):
- Function: `handleVideoStartState()` - Create video project
- Function: `handleSwitchModeState()` - Switch to video mode
- Function: `uploadStartFrame()` - Upload start frame
- Function: `handleVideoWaitResult()` - Poll for result
- Constants: `VIDEO_SELECTORS`, video-specific validation

✅ **Core Schema** (`core/schema.js`):
- `STORAGE_KEYS.IMAGE_UPLOAD` - Image upload state
- `STORAGE_KEYS.VIDEO_UPLOAD` - Video upload state
- `STORAGE_KEYS.BASE_UPLOAD` - Base upload state

---

## Part 3: Comparative Analysis

### 3.1 Things We Got RIGHT ✅

| # | Understanding | Evidence | Impact |
| :--- | :--- | :--- | :--- |
| 1 | State Machine pattern is correct | Both Legacy & New use same pattern | ✓ No changes needed |
| 2 | Service separation concept is sound | Image vs Video have distinct flows | ✓ SOA is the right direction |
| 3 | Selector strategy is good | Fallback selectors work in both | ✓ Keep current approach |
| 4 | Human behavior simulation works | `human-behavior.js` unchanged | ✓ Keep as-is |
| 5 | Utility extraction is valid | `core/utils.js`, `core/schema.js` good | ✓ Keep organization |

### 3.2 Things We Got WRONG ❌

| # | Misunderstanding | What We Did | What Was Correct | Impact |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Function Naming** | Called `handleImageStartState` | Legacy uses `handleImageStart` | ⚠️ Naming mismatch |
| 2 | **Entry Point** | Assumed multiple entry points | Real entry: `handleStartState` → routes | ⚠️ State Machine expects routing |
| 3 | **Shared Logic** | Split into separate services | Image/Video share `FILL_IMAGES`, `FILL_PROMPT`, `GENERATE` | ⚠️ Duplicate/missing code |
| 4 | **Storage Keys** | Centralized (OK) | Original was scattered (OK too) | ✓ Improvement |
| 5 | **Export Pattern** | `window.ImageService.handleImageStart` | Legacy doesn't use this | ⚠️ Import/Export broke |

---

## Part 4: The Critical Bugs Explained

### Bug Chain That Broke Everything

**Chain Reaction**:
```
1. manifest.json loads all files in order ✓
2. script reaches flow-content-script.js
3. Line 1783: window.handleStartState = handleStartState; ← But handleStartState doesn't exist!
4. ERROR: ReferenceError ✗
5. Script stops loading
6. State Machine never loaded
7. Everything breaks
```

**Why This Happened**:
- We deleted `handleStartState()` function when moving to Services
- But forgot to delete the export assignment
- Legacy Code DOES have `handleStartState()` as real entry point

### Missing From New Implementation

When we split into Services, we LOST:

1. **`handleStartState()` entry point** - Now completely removed
2. **Proper routing logic** - Should route START state to Image/Video
3. **Unified FILL_IMAGES handler** - Should work for both Image and Video
4. **Unified FILL_PROMPT handler** - Should work for both Image and Video  
5. **Unified GENERATE handler** - Should work for both Image and Video
6. **Shared state tracking** - Upload state is scattered

---

## Part 5: Why It "Fell Apart"

### Architecture Mismatch Diagram

```
LEGACY (Monolithic):
┌─────────────────────────────────┐
│   flow-content-script.js        │
│  (2,040 lines - All Handlers)   │
├─────────────────────────────────┤
│ handleStartState()              │ ← Entry
│  ├─ handleImageStartState()     │ ← Image/Video Router
│  │  ├─ handleFillImages()       │ ← SHARED (works for both!)
│  │  ├─ handleFillPrompt()       │ ← SHARED
│  │  ├─ handleGenerate()         │ ← SHARED
│  │  └─ handleWaitResult()       │ ← Image-specific
│  └─ handleVideoStartState()     │ ← Video-specific
│     └─ (uses FILL_IMAGES, etc.) │ ← REUSES shared handlers!
└─────────────────────────────────┘
       ↑
State Machine (calls handleStartState)
```

```
NEW (SOA - Broken):
┌──────────────────┐  ┌──────────────────┐
│  ImageService    │  │  VideoService    │
│  - handleImageStart  │  - handleVideoStartState
│  - handleFillImages  │  - handleSwitchModeState
│  - handleFillPrompt  │  - uploadStartFrame
│  - handleGenerate    │  - handleVideoWaitResult
│  - handleWaitResult  │
└──────────────────┘  └──────────────────┘
       ↑                       ↑
       └───State Machine──────┘
           (broken: expects
            handleImageStartState,
            not handleImageStart)

┌──────────────────────┐
│ flow-content-script  │
│ (gutted - no handlers)
└──────────────────────┘
   ↑ (tries to export non-existent functions)
   ✗ ERROR
```

### The Core Problem

**Legacy treats Image and Video generation as a single flow with branching**:
```
START → [Image/Video?] → FILL_IMAGES → FILL_PROMPT → GENERATE → WAIT_RESULT
                ↓
         handleImageStartState does BOTH
         (contains if/else for mode)
```

**We tried to separate them physically**:
```
START → ImageService.handleImageStart() ──┐
                                           └→ FILL_IMAGES (only in ImageService)
START → VideoService.handleVideoStart() ──┐
                                           └→ (tries to call handleFillImages?)
```

**Problem**: When VideoService tries to do FILL_IMAGES, that logic is in ImageService!

---

## Part 6: Recovery Path (How to Fix)

### Option A: "Surgical Service Extraction" (RECOMMENDED)

**Keep the SOA structure but fix the dependencies**:

1. **Restore `handleStartState()` as coordinator**
   - Keep it in `flow-content-script.js`
   - Routes to Image or Video service
   - Coordinates shared state

2. **Create `core/shared-handlers.js`** for:
   - `handleFillImages()` - Works for BOTH
   - `handleFillPrompt()` - Works for BOTH
   - `handleGenerate()` - Works for BOTH
   - These call utils from both services

3. **Restructure Services**:
   - `ImageService`: START-only logic, result validation
   - `VideoService`: START-only logic, mode switching, frame upload
   - Both use `window.SharedHandlers` for middle states

4. **Update State Machine**:
   - Calls `handleStartState()` (the router)
   - Calls `window.SharedHandlers.handleFillImages()`
   - Calls service-specific handlers only when needed

### Option B: "Keep It Together" (SIMPLEST)

Just revert to Legacy structure but with better code organization:
- Keep handlers in one file (`flow-content-script.js`)
- Extract utilities to services (already done)
- Mark Image vs Video sections clearly
- Don't try to separate by file

### Option C: "Proper Async Service Pattern" (FUTURE)

This would require deeper refactoring:
- Dependency injection for shared handlers
- Proper interface contracts between services
- Pre-build phase to compose services
- Too much for current timeline

---

## Part 7: Why We Didn't Catch This Earlier

### Testing Gaps
```
✓ Done: Syntax check (node -c)
✓ Done: Git history review
✗ Missing: Load extension in Chrome
✗ Missing: Check console for errors
✗ Missing: Step through each state
✗ Missing: Test Image flow separately from Video
```

### Architectural Discovery Process
```
Should have done:
1. Read Legacy code first (know what you're refactoring)
2. Make ONE small change
3. Test in browser
4. Commit if works
5. Next change

What we did:
1. Made 4 phases of changes
2. Committed all
3. Tested once
4. Found everything broken
```

---

## Summary Table: What to Do

| Component | Current State | Issue | Fix |
| :--- | :--- | :--- | :--- |
| `handleStartState()` | Deleted | Entry point missing | Restore it |
| Function naming | `handleImageStart` | Mismatch with State Machine calls | Rename or update calls |
| FILL_IMAGES logic | Split between services | Both Image and Video need it | Create `shared-handlers.js` |
| FILL_PROMPT logic | Split between services | Both Image and Video need it | Create `shared-handlers.js` |
| GENERATE logic | Split between services | Both Image and Video need it | Create `shared-handlers.js` |
| Storage keys | Centralized (schema.js) | Actually OK | Keep as-is |
| Core/utils | Good | No issue | Keep as-is |

---

## Oracle's Recommendation

### ✅ Do This First (Before Coding)

1. **Copy Legacy `flow-content-script.js` as reference**
2. **Map every function call chain**:
   - Where does Image START come from?
   - Where does Video START come from?
   - Who calls FILL_IMAGES?
   - What happens after GENERATE?
3. **Create ASCII flow diagram** of state machine
4. **Identify truly shared vs truly separate code**

### ✅ Then Code This Way

1. **Start with Option A: Surgical Service Extraction**
   - Restore `handleStartState()` router
   - Create `core/shared-handlers.js`
   - Update Service exports
   - Test EACH commit in browser

2. **Test order**:
   - Load extension → no console errors
   - Open Flow app → State Machine loads
   - Click Generate Image → trace through states
   - Click Generate Video → trace through states

3. **Commit order**:
   - Fix #1: Restore entry point
   - Fix #2: Create shared handlers
   - Fix #3: Update services
   - Fix #4: Update state machine
   - **Test after EACH**

---

**Status**: Ready for Implementation (Once approved)
**Estimated Time**: 2-3 hours with testing
**Risk Level**: Medium (Clear path forward, but requires careful execution)
**Confidence Level**: High (Now we understand the real architecture)
