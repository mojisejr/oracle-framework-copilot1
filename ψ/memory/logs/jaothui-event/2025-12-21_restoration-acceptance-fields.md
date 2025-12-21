# Snapshot: Restoration of Acceptance Conditions in Royal Form
**Date**: 2025-12-21 15:06
**Issue**: #none
**Project**: jaothui-event

## Context
During the refactor to add `buffaloImage2` and remove unused `d1-d3` images, the `d1Accept`, `d2Accept`, and `d3Accept` radio buttons were accidentally removed. These fields are mandatory consent conditions for registration.

## Changes
- **Restored** `d1Accept`, `d2Accept`, `d3Accept` to `RoyalFormTypes` in `RoyalForm.tsx`.
- **Restored** validation logic in `onSubmit` to ensure all consent fields are checked.
- **Restored** UI radio buttons for `d1Accept`, `d2Accept`, and `d3Accept`.
- **Restored** informational text regarding free services from the livestock office.
- **Maintained** `buffaloImage2` implementation across all layers (Frontend, TRPC, Service, Sanity).

## Verification
- Ran `npm run build` in `projects/jaothui-event`.
- Build successful with no type errors in the modified files.

## Tools Used
- `read_file`
- `run_in_terminal` (git diff, date, npm run build)
- `replace_string_in_file`
- `create_file`
