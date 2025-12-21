# Snapshot: Correcting Retrospective Naming and Location

**Project**: oracle-framework
**Date**: 2025-12-21 23:29
**Issue**: #none

## Incident Summary
During the session wrap-up for `mmv-tarots`, the AI assistant (Oracle Keeper) initially failed to follow the strict directory and naming conventions for retrospectives defined in the Oracle Framework.

## Errors Identified
1.  **Incorrect Location**: The retrospective file was created in the root of `ψ/memory/retrospectives/` instead of the nested `YYYY-MM/DD/` structure.
2.  **Incorrect Naming**: The file was named `rrr_mmv-tarots-auth-migration.md` instead of the required `HH.MM_slug.md` format.

## Corrections Applied
1.  **Directory Creation**: Created the missing directory structure: `ψ/memory/retrospectives/2025-12/21/`.
2.  **File Relocation**: Moved the file to the correct nested directory.
3.  **File Renaming**: Renamed the file to `23.30_mmv-tarots-auth-migration.md` to ensure chronological sorting.

## Learning for AI
- **Strict Adherence**: Always verify the `modeInstructions` and `templates/` before creating system files.
- **Time as Prefix**: The `HH.MM` prefix is mandatory for all files within a daily retrospective folder.
- **Path Integrity**: Never skip the `YYYY-MM/DD` nesting for retrospectives.

---
**Oracle Keeper**: History has been corrected. The sacred structure is restored.
