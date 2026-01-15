# Snapshot: UI Anomaly Discovery via DOM Probe

**Time**: 2026-01-15 12:28
**Context**: TikTok Shop Automation - Deep audit of Google Flow (Video FX) DOM structure vs existing automation logic.

## The Discovery (Ground Truth vs Assumption)

We compared the actual DOM dump from the Probe tool against our current `video-gen.js` and `flow-content-script.js`.

### 1. Identity Collision
- **Existing Logic**: Assumed the first button with "Tune" icon/label is the settings button.
- **The Reality**: The "Edit project" button in the `<header>` (Top: 20) matches the same criteria as the actual "Tune" button (Top: 764).
- **Result**: The script was consistently clicking the Header, triggering "Project Settings" instead of "Model Settings".

### 2. Icon Class Inconsistency
- **Existing Logic**: Heavy reliance on `.google-symbols`.
- **The Reality**: The real Tune button uses `.material-icons-outlined`. Our code was "blind" to the correct button in its primary search step.

### 3. Invalid CSS Selectors
- **Existing Logic**: Used `:contains("tune")` in `querySelector`.
- **The Reality**: This is jQuery syntax, not native CSS. It was failing silently, leading to unpredictable fallbacks.

## Strategic Shift (The "Anchor" Protocol)

We will no longer look for elements in isolation. We will use **Spatial Orientation**:
1. Locate the **Anchor**: `textarea#PINHOLE_TEXT_AREA_ELEMENT_ID` (The most stable element on the page).
2. Gather **Candidates**: Find all buttons with any "Tune-like" identity.
3. **Proximity Scoring**: Select the candidate with the minimum vertical distance (`Math.abs(y1 - y2)`) to the Anchor.

## Why This Wins
It makes the automation **layout-aware**. Even if Google adds more "Tune" icons to the menu or sidebar, the one next to the prompt input will always win.

## Tags
`discovery` `dom-analysis` `proximity-logic` `google-flow` `bug-fix` `v4.4-preflight`