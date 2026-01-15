# Snapshot: Diagnostic Analysis - TikTok Shop Automation

**Time**: 2026-01-12 22:52
**Context**: Diagnosing issues reported in Image Gen and Video Gen pipelines.
**Mode**: Oracle Keeper

## 🚨 Reported Issues & Analysis

### 1. Image Gen: Settings Skipped (Portrait/Output Count)
-   **Symptom**: Skips setting aspect ratio (portrait) and quantity (1 image).
-   **Root Cause**: In `handleFillPromptState` (Image Gen), there is **NO CALL** to `configureSettings`. The workflow goes `FILL_IMAGES` -> `FILL_PROMPT` -> `GENERATE`. The code for `configureSettings` exists in `flow-content-script.js` but is never invoked in `flow-state-machine.js`.
-   **Solution**: Inject `await window.flowAutomation.configureSettings('Portrait', '1');` before `transitionTo(FLOW_STATES.GENERATE)` in `handleFillPromptState`.

### 2. Video Gen: Wrong Image / Infinite Loop
-   **Symptom**: "Looping in and out", "Clicks elsewhere", "Wrong Image".
-   **Deep Trace**:
    1.  `uploadStartFrame` (flow-content-script.js) detects "First Frame" button.
    2.  It attempts to clear existing frame if present.
    3.  It calls `uploadImageViaAddButton` with index `0`.
    4.  **The Loop**: The FSM logic for `UPLOAD_START_FRAME` just calls this function. If the upload succeeds, it transitions to `FILL_VIDEO_PROMPT`.
    5.  **Hypothesis**: The "Loop" is likely **not infinite** but a **race condition** in `uploadStartFrame`. The "Clearing" logic (clicking 'x') might be fighting with the "Upload" logic if React re-renders slowly.
    6.  **"Wrong Image"**: The log shows it fetches an external URL (`storage.googleapis.com/...`) and uploads it. If the user sees it "taking an image from elsewhere", it might be that the `fetch` and `File` creation works, but when clicking the "Add" button, the file input isn't attached correctly, or the site's own "Media Library" modal pops up instead of the system file dialog (which automation bypasses by attaching to `<input type="file">`).
    7.  **Correction**: Ensure `uploadImageViaAddButton` strictly targets the `<input type="file">` associated with that button index.

### 3. Video Gen: Stall after 1st Product
-   **Symptom**: Hangs, eventually Errors, closes.
-   **Root Cause**: **Service Worker Termination**.
    -   Video generation takes > 30 seconds (likely minutes).
    -   The `WAIT_RESULT` loop runs in the **Content Script**.
    -   The **Background Script** (Service Worker) goes to sleep if no messages are sent.
    -   When `WAIT_RESULT` finishes and sends `COMPLETED` message, the Service Worker is dead. The message fails (`channel closed`).
    -   Background never processes the next item.
-   **Solution**:
    -   **Heartbeat**: Ensure `flow_heartbeat` alarm is active and effective.
    -   **Keep-Alive Messaging**: The content script should ping the background every 20s during `WAIT_RESULT`.

## 🛠️ Action Plan (Simple + Robust + Convention)
1.  **Fix Settings**: Call `configureSettings` in Image Flow.
2.  **Fix Video Upload**: Hardify `uploadStartFrame`. Add explicit check for "Media Library" popups and dismiss them. Ensure we are targeting the file input directly.
3.  **Fix SW Death**: Implement "Long-Running Job" pattern (Content Script pings Background periodically).

## Tags
`#diagnostic` `#race-condition` `#mv3-termination`
