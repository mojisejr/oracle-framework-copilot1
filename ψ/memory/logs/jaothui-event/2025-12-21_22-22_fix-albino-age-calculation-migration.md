# Snapshot: Fix Albino Age Calculation & Migration Strategy

**Time**: 2025-12-21 22:22
**Context**: Fixing a critical bug in `jaothui-event` where Albino buffaloes were assigned to incorrect age cohorts due to a logic error in age calculation and regex parsing.

## Insight

1.  **Albino Age Logic**:
    *   **Rule**: Albino buffalo age is calculated up to the 11th of the month.
    *   **Implementation**: Instead of complex date math, simply `subtract(1, "day")` from the birthdate before calculating the month difference against the deadline. This ensures that if a buffalo was born on the 12th, it falls into the previous month count correctly relative to the 11th.

2.  **Regex & Range Overlaps**:
    *   **Problem**: Ranges like "10-12 months" and "Greater than 12 months" overlap if "Greater than" isn't handled explicitly.
    *   **Fix**: When parsing "มากกว่า X เดือน", the minimum value must be `X + 1` to ensure distinct boundaries (e.g., >12 starts at 13).

3.  **Safe Migration Pattern**:
    *   **Backup First**: Always fetch and dump the raw dataset to a JSON file before running any update script.
    *   **Dry Run**: Implement a `DRY_RUN` flag to preview changes.
    *   **Level Protection**: When re-calculating cohorts, prioritize keeping the entity in its current `level` (e.g., Province vs National) to prevent unwanted category jumps.

## Apply When

*   Calculating age for competition eligibility with specific cutoff dates.
*   Parsing Thai text ranges for numerical logic.
*   Running data migration scripts on production databases (Sanity).

## Tags

`jaothui-event` `bugfix` `migration` `sanity` `logic`
