# Snapshot: Manual Mode Implementation for Special Events

**Time**: 2026-01-09 14:59
**Context**: Implementation of Manual Selection for special competition classes (e.g., Dwarf Buffalo, Grand Champion) that cannot be auto-detected by age regex in `jaothui-event`.

## Insight

**Problem**: The existing `FormV3` relied entirely on regex `(\d{1,2}) เดือน` to parse age from competition labels and auto-assign the class. Special classes (text-only like "รุ่นฟันน้ำนม") failed to match, causing no valid options to appear.

**Solution**:
1.  **Dual Mode UI**: Introduced `isManualMode` state.
    - **Auto Mode**: Default behavior. Uses `age` calculator + Regex.
    - **Manual Mode**: User explicitly selects `competitionLevel` (Type) and `competitionType` (Class) via Dropdowns.
2.  **Backend Separation**:
    - Updated `event.service.ts` to return `specialProvinceTypes` and `specialNationalTypes` separately by checking which events do *not* match the regex.
3.  **State Management Criticality**:
    - **Bug**: Simply toggling `isManualMode` was insufficient because `react-hook-form` retained the `competitionLevel` value from the auto-detect attemp. This caused the UI (which hides dropdowns if a level is selected) to remain in a "locked" state.
    - **Fix**: The "Special Register" button `onClick` handler explicitly calls `setValue("competitionLevel", "")` to force the UI into input mode.

## Code Changes
- `src/utils/getPossibleEvents.ts`: Added `getSpecialEvents` filter.
- `src/server/services/event.service.ts`: Payload now includes special types.
- `src/components/Events/Formv3.tsx`: Added Manual/Auto toggle logic and state clearing.

## Apply When

When converting "Magic Auto-form" features into "Hybrid" forms. Always remember to **reset form state** when switching UI modes, otherwise the hidden values will conflict with the new mode's logic.

## Tags

`react-hook-form` `manual-mode` `state-reset` `ux-hybrid`
