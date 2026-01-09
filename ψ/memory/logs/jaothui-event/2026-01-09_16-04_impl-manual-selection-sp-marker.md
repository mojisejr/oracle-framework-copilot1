# Snapshot: Implementing Manual Selection with [SP] Marker Pattern

**Time**: 2026-01-09 16:04
**Context**: Fixing complex UI/State collisions and implementing a metadata marker convention for special competition classes in `jaothui-event`.

## Insight

1. **Marker Pattern ([SP])**: Using a technical prefix like `[SP]` in CMS metadata allows backend logic to reliably differentiate "Special" categories from "Auto-detected" ones without requiring complex schema changes.
2. **Watcher Scoping**: In `react-hook-form`, global `watch()` subscriptions can trigger infinite loops if they modify component state that in turn resets form values. Scoping the watcher to specific fields (e.g., `buffaloBirthDate`) and checking `event.type === 'change'` prevents programmatic updates from triggering unwanted side-effects.
3. **Data Normalization Loop**: Technical markers used for logic branching MUST be stripped at three points to maintain system integrity:
    - **Selection Dropdown**: For clean user choice.
    - **Current Selection UI**: For user confirmation.
    - **Submission Payload**: To prevent technical markers from entering the Production Database.

## Apply When

- Building forms that combine auto-detection with manual override.
- Working with CMS data that needs logical grouping not present in the primary fields.
- Debugging "vanishing UI" issues caused by state-to-form feedback loops.

## Tags

`react-hook-form` `marker-pattern` `state-management` `data-integrity` `jaothui-event`
