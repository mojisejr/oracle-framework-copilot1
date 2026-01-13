# Snapshot: Implementation Plan - TikTok Shop Automation Fixes

**Time**: 2026-01-12 22:54
**Context**: Finalizing the repair plan for Image Gen settings, Video Gen loop, and Service Worker termination issues.
**Mode**: Oracle Keeper

## 🛡️ Implementation Blueprint

This plan adheres to the **"Simple + Robust + Convention"** standard. We will apply fixes incrementally.

### Phase 1: Image Gen Stability (Settings Fix)
**Objective**: Ensure images are generated in Portrait mode (9:16) and single quantity.
-   **File**: `features/feature-c-google-flow/flow-state-machine.js`
-   **Action**: In `handleFillPromptState`, inject the call to `window.flowAutomation.configureSettings('Portrait', '1')` just before transitioning to `GENERATE`.
-   **Robustness**: Add a `try-catch` wrapper around settings configuration so it doesn't block the flow if UI changes (warn-only).

### Phase 2: Video Gen Integrity (Upload Logic)
**Objective**: Prevent "Wrong Image" selection and "Infinite Loop" behavior.
-   **File**: `features/feature-c-google-flow/flow-content-script.js`
-   **Action**: Refactor `uploadStartFrame`:
    1.  **Isolation**: Separate "Clear existing frame" logic into its own helper.
    2.  **Targeting**: Use specific `aria-label` or text content ("First Frame") to find the upload button, instead of assuming `index 0`.
    3.  **Validation**: Verify the `File` object is correctly created from the Blob before attaching to input.

### Phase 3: System Resilience (Keep-Alive)
**Objective**: Prevent Service Worker death during long Video Generation tasks.
-   **File**: `features/feature-c-google-flow/flow-content-script.js` & `background.js`
-   **Action**:
    1.  **Content Script**: In `handleWaitResultState`, add a `setInterval` loop that sends a `PING` message to runtime every 20 seconds.
    2.  **Background Script**: Ensure the `onMessage` listener handles `PING` by resetting any termination timers (if relying on alarms) or simply returning `true` to keep the port open.

## 📝 Execution Order
1.  **Phase 1 (Settings)**: Quick win, easy to verify.
2.  **Phase 3 (Keep-Alive)**: Critical infrastructure fix.
3.  **Phase 2 (Video Logic)**: Complex UI interaction, needs careful testing.

## Definition of Done (DoD)
-   [ ] Image Gen produces 1 Portrait image.
-   [ ] Video Gen uploads the correct product image (Start Frame).
-   [ ] Multiple products can be processed in sequence without "Extension Invalidated" or "Channel Closed" errors.

## Tags
`#plan` `#fix` `#stability` `#mv3`
