# Snapshot: Legacy/v4.0 Video Fix Implementation

**Time**: 2026-01-14 15:05
**Context**: Implement fixes outlined in analysis [2026-01-14_14-55_legacy-video-failure-analysis.md](ψ/memory/logs/tiktok-shop-automation/2026-01-14_14-55_legacy-video-failure-analysis.md).

## 🛠️ Changes Applied

### 1. Activated "Targeted Finger" (shared-handlers.js)
- **Before**: `await uploadImageViaAddButton(..., 0)`
- **After**: `await window.VideoService.uploadStartFrame(...)`
- **Why**: Ensures the system uses the new logic that finds the `swap_horiz` button first, guaranteeing clicks on the correct Frame Slot instead of the random "Add" button at index 0 (which was the Asset Library upload).

### 2. Slowed Down Config (video-gen.js)
- **Before**: Immediate execution of `configureVideoSettings`
- **After**: Added `await sleep(3000)` at the start.
- **Why**: Prevents "phantom clicks" where the script clicks the Tune button before the UI is fully interactive or while the Mode Switch animation is still playing.

## 🔮 Expected Outcome
1. **No more Upload Loop**: System will hit the correct button -> File Input appears -> Upload succeeds.
2. **Stable Config**: Extra wait time allows the Settings menu to open reliably.

## Tags
`v4.0` `legacy-fix` `video-gen` `upload-target`
