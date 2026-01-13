# Snapshot: Codebase Auditing & Recovery Plan

**Time**: 2026-01-13 15:16
**Context**: Debugging a regression in `flow-content-script.js` where Image Gen failed after adding Video Gen logic.

## 🚨 The Incident
After implementing the "Dual Pipeline" (Image vs Video) logic in `flow-content-script.js`, the code broke with a `SyntaxError`.
**Root Cause**:
- **Spaghetti Code**: Use of massive function `handleWaitResultState` (200+ lines) containing both Image and Video logic.
- **Merge Artifacts**: Duplicate code blocks and unbalanced braces were introduced during the edit, causing the `try/catch/finally` structure to fail.
- **Lack of Physical Separation**: Logic was separated only by `if/else` within the same file, making it fragile (editing Video logic broke Image logic).

## 🔍 Architecture Audit
**Current State (Fragile)**:
- `feature-c-google-flow/flow-content-script.js` handles:
    - DOM Manipulation (`findElement`)
    - State Machine (`handleWaitResultState`)
    - Image Validation Logic
    - Video Validation Logic (newly added)
    - Rate Limiting
- **Coupling**: High. Changing Video validation requires editing the same function affecting Image validation.

**Desired State (Robust)**:
- **Physical Separation**: Distinct files for distinct responsibilities.
- **Modules**:
    - `flow-core.js`: Orchestrator & State Machine.
    - `flow-mode-image.js`: Exclusive logic for Image Generation.
    - `flow-mode-video.js`: Exclusive logic for Video Generation.
- **Manifest**: Inject all 3 scripts. Orchestrator detects `currentMode` and delegates to the correct handler.

## 🛠 Recovery Plan (The "Universal Oracle Standard")

### Phase 1: Stabilization (Immediate)
- [x] **Fix Syntax Error**: Clean up the brace mess in `flow-content-script.js` to restore baseline functionality.
- [ ] **Verify**: Ensure the app runs without crashing.

### Phase 2: Refactoring (The Split)
1.  **Extract Helpers**: Move `findElement`, `sleep`, `log` to `core/dom.js` or `core/utils.js` (if not already there).
2.  **Create Handlers**: 
    - `features/feature-c-google-flow/handlers/image-handler.js`
    - `features/feature-c-google-flow/handlers/video-handler.js`
3.  **Update Manifest**: Inject these new files before the main script.
4.  **Refactor Main Loop**: `handleWaitResultState` delegates:
    ```javascript
    if (mode === 'video') return VideoHandler.waitForResult();
    else return ImageHandler.waitForResult();
    ```

## Tags
`architecture` `refactor` `debugging` `tiktok-shop-automation`
