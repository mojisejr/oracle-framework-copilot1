# Snapshot: Fixing Manual Mode Feedback Loop

**Time**: 2026-01-09 15:27
**Context**: Debugging the "Vanish" bug in `jaothui-event`'s `FormV3` component where Manual Selection UI disappears immediately after clicking.

## Root Cause Discovery

The bug is caused by an **Infinite Feedback Loop** in the `react-hook-form`'s `watch` subscription:
1.  **Global Watcher**: The `useEffect` with `watch(({ bufferBirthDate, microchip }) => ...)` is NOT scoped to specific fields. It triggers on *every* form change.
2.  **The Trigger**: The `handleToggleManualMode` function calls `setValue("competitionLevel", "")`.
3.  **The Loop**: This `setValue` triggers the global `watch`. The global `watch` executes its callback, which contains `setIsManualMode(false)`.
4.  **The Erasure**: `setIsManualMode(false)` resets the mode back to Auto. Since we just cleared the Auto-assignment state to make room for Manual, the UI has no data to display (Auto = False, Manual = False), resulting in a "Void UI" where everything disappears.

## Implementation Plan

1.  **Scope the Watcher**:
    - Change the broad `watch()` to a specific watcher: `watch(["buffaloBirthDate", "microchip"])`.
    - This ensures that changing "Class" or "Level" (manual fields) does **not** trigger the Auto-reset logic.
2.  **Conditional Reset**:
    - Add a check inside the watcher to only call `setIsManualMode(false)` if the values *actually* changed from their previous stored values, or just let the scoped watcher handle the isolation.
3.  **State Stability**:
    - Refine `handleToggleManualMode` to ensure React's batching correctly handles all state updates before the next render cycle.
4.  **Cleanup**:
    - Remove redundant `setIsManualMode(false)` calls from other side-effects that might interfere.

## Apply When

When build complex hybrid forms (Auto-filling + Manual Overrides). Always scope `watch` and `useEffect` dependencies precisely to avoid cascading resets.

## Tags

`react-hook-form` `infinite-loop` `state-management` `bug-analysis`
