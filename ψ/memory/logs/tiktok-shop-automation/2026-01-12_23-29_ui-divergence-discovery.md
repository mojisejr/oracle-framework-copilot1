# Snapshot: UI Structure Divergence (Video Gen Buttons)

**Time**: 2026-01-12 23:29
**Context**: Investigating "Button not found" error in Video Gen mode after strict targeting implementation.

## Insight

- **Strict Mode Failure**: The recent fix expected the text "First Frame" to be *inside* the `<button>` element. 
- **DOM Reality**: Console results show that the buttons only contain the text `"add"` and have no `aria-label`. The text "First Frame" is likely a sibling or parent label that is not captured by direct button text filtering.
- **Log Observation**: `Found 6 potential upload buttons` was reported in logs, but the console dump only shows 2 "add" buttons + 1 mode switcher. This suggests some buttons might be hidden or dynamically loaded.
- **Ambiguity**: Without a unique identifier like `aria-label` or specific text inside the button, relying on `textContent` for the button itself is impossible for "First Frame".

## Apply When

- Refining element targeting for Google Labs Flow. 
- Debugging "Critical: Button not found" errors.

## Tags

`dom-audit` `ui-bug` `google-flow` `target-divergence`
