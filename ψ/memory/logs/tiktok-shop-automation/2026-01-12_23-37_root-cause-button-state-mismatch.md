# Snapshot: Root Cause - Button State Mismatch (Video Upload)

**Time**: 2026-01-12 23:37
**Context**: Investigating why Video Gen upload fails with "File input did not appear" error

## Root Cause Analysis

### The Problem Chain
1. **Button Click Success**: System successfully clicks the "add" button at Index 0
2. **File Input Never Appears**: After clicking, `<input type="file">` never gets injected into DOM
3. **Polling Timeout**: System polls for 5 seconds (25 iterations x 200ms) but finds 0 file inputs
4. **Error & Retry**: Throws error and retries (up to 10 times), all fail with same pattern

### Why This Happens (The Real Issue)
**UX Design Mismatch**: Google Flow's "Frames to Video" mode has TWO types of buttons with `text="add"`:
1. **Type A**: Empty slot button (shows Material Icon "add") - Opens file picker ✅
2. **Type B**: Slot with existing image (shows "First Frameclose") - REMOVES image, doesn't open picker ❌

**The Bug**: Our "Clear Image" logic successfully identifies and clicks Type B (button with "close" icon), but then the function IMMEDIATELY proceeds to find and click the "add" button again at Index 0. However, between the "clear" action and the "re-get buttons" step, the DOM hasn't fully updated yet. The button at Index 0 might still be in a transitional state or pointing to the wrong element.

### Evidence from Logs
```
logger.js:31 [FlowContentScript] [INFO] Existing image found in First Frame slot. Clearing it first...
(Click happens here - button shows "First Frameclose")
logger.js:34 [FlowContentScript] [WARN] Warning: Frame might not be cleared (timeout)
logger.js:28 [FlowContentScript] [DEBUG] Found 6 potential upload buttons on page
logger.js:31 [FlowContentScript] [INFO] Could not identify "First Frame" by text. Using positional logic (Index 0)
(Click happens again - but file input never appears)
logger.js:28 [FlowContentScript] [DEBUG] Polling for file input... Found 0 total inputs
```

The log shows we click the button, but the UI hasn't stabilized. The `sleep(1000)` after clearing is NOT enough for Google's React app to re-render.

## The Real Issue (Not URL-related)
- ❌ **NOT** a problem with `generatedImageUrl` (the URL is correct and being fetched successfully: `External image fetched and converted`)
- ✅ **IS** a DOM Timing Issue: We're clicking the button before React finishes re-rendering after the "clear" action
- ✅ **IS** a Button State Issue: The button at Index 0 might not be in "ready to open file picker" state

## Proposed Solution (Simple + Robust)

### Strategy: "Wait for Button State Change"
Instead of blindly waiting 1 second after clearing, we should:
1. Click the "clear" button (Icon: "close")
2. **POLL for the button to change state**: Wait until the button's icon changes from "close" to "add" (confirming React has re-rendered)
3. THEN proceed to click the button for upload

### Pseudo-code
```javascript
// After clicking clear
let buttonReady = false;
for (let i = 0; i < 30; i++) { // 6 seconds max
    await sleep(200);
    const btn = findFirstFrameBtn();
    const iconText = btn?.querySelector('i')?.textContent || '';
    if (btn && iconText.includes('add') && !iconText.includes('close')) {
        buttonReady = true;
        break;
    }
}
if (!buttonReady) {
    throw new Error('Button did not return to "add" state after clearing');
}
```

## Apply When
- Debugging Google Flow Video Upload failures
- Fixing DOM timing issues in React-heavy UIs
- Implementing "clear then upload" workflows

## Tags
`dom-timing` `react-state` `video-gen` `button-state-machine` `root-cause`
