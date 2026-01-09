# Snapshot: Bug - Manual Mode Disappearing on Toggle

**Time**: 2026-01-09 15:10
**Context**: Debugging `FormV3` component where switching from Auto-detect directly to Manual Mode causes the entire specific section to disappear (both Auto box vanishes AND Manual box doesn't show).

## Insight

**Problem**: The "Vanish" Bug.
The conditional rendering logic was mutually exclusive in a way that created a "void" state.
- **Trigger**: User clicks "สมัครรุ่นพิเศษ" -> `handleToggleManualMode(true)` is called.
- **Action**: The handler sets `isManualMode = true`, `isAutoAssigned = false`, AND clears `competitionLevel`.
- **The Gap**: The logic checking `isAutoAssigned` and `autoAssignedClass` failed *before* the `isManualMode` block could render, OR the `isManualMode` block itself had internal conditions (like `watch("competitionLevel")`) that weren't met yet, while the parent condition might have been relying on `typeLoading` which shouldn't be affected.

HOWEVER, a closer inspection of the render logic reveals:
```tsx
  ) : isManualMode ? (
    // Manual Mode UI
  ) : isAutoAssigned && autoAssignedClass?.competitionLevel ? (
    // Auto UI
```
The previous fix cleared `isAutoAssigned` to `false` *instantly*. If `isManualMode` was set to `true`, it *should* have entered the first block.
If it disappeared, it implies that `isManualMode` might have been reset back to `false` by a side effect.

**Likely Culprit**:
The `useEffect` in `FormV3` lines 193-206 watches `deadline` (and potentially `calculatedAge` indirectly) and resets `setIsManualMode(false)`.
BUT MORE IMPORTANTLY, the `useEffect` at lines 252 responsible for Auto-Assignment might be re-running.

**The Fix Attempt (Failed)**:
Clearing `isAutoAssigned = false` was good, but clearing `competitionLevel` might have triggered a `watch` effect that somehow re-evaluated something undesirable.

**New Hypothesis**:
We need to stabilize the mode *before* clearing values, or ensure the rendering logic fallback doesn't hide everything.

## Apply When

Debugging "Disappearing Component" bugs in React with complex state toggles (Auto vs Manual).

## Tags

`react` `conditional-rendering` `state-race-condition` `bug-report`
