# Snapshot: Manual Mode Infinite Loop Fixed

**Time**: 2026-01-09 15:56
**Context**: Successfully fixed the "Vanish" bug in `jaothui-event`'s Manual Selection Mode. The UI no longer disappears upon activation.

## Insight

**The Fix**:
The root cause was confirmed to be a feedback loop in `watch()`.
- **Before**: `watch((val) => ...)` triggered on *any* change. When `handleToggleManualMode` cleared the `competitionLevel`, it triggered `watch`, which then called `setIsManualMode(false)`, instantly reverting the UI to a specific invalid state (Hidden).
- **After**: Changed to `watch((value, { name, type }) => ...)` with specific checks:
  1.  Only proceed if `name` is `buffaloBirthDate` or `microchip`.
  2.  Only call `setIsManualMode(false)` if the event `type` is `'change'` or `'blur'` (user Interaction), ignoring programmatic changes.

**Result**:
- Toggle works instantly.
- Manual Dropdowns appear correctly.
- Auto-calculate logic still works but respects the Manual Mode state.
- Build passes 100%.

## Apply When

Using `react-hook-form`'s `watch` to trigger side effects (like resetting UI state). ALWAYS verify that your side effect (e.g., `setState`) doesn't trigger the watcher again indirectly via another field update.

## Tags

`react-hook-form` `bug-fix` `infinite-loop` `success`
