# Learning: Safe Data Migration Pattern for Sanity

**Date Discovered**: 2025-12-21
**Source Session**: [22.45_fix-albino-migration.md](../../retrospectives/2025-12/21/22.45_fix-albino-migration.md)
**Category**: Process | Technical

## Pattern

A three-stage workflow for patching production data: **Backup (JSON) -> Dry Run (Log only) -> Execution (Commit)**.

## Context

Discovered while fixing incorrect age cohorts for 27 albino buffalo registrations in the `jaothui-event` project. The data was live, and any mistake would have corrupted competition eligibility.

## The Learning

1.  **JSON Backup**: Before any patch, fetch the entire affected dataset and save it to a local JSON file. This is faster and more reliable than relying on database-level snapshots for quick restores.
2.  **Modifier-Aware Parsing**: When parsing Thai strings like "มากกว่า 12 เดือน" (Greater than 12 months), regex must account for the modifier ("มากกว่า"). If ignored, it creates overlaps with ranges like "10-12 เดือน".
3.  **Day-Level Cutoffs**: For business rules like "Cutoff on the 11th", it is safer to adjust the source date (e.g., `birthdate.subtract(1, "day")`) than to adjust the final result (e.g., `age - 1`). This ensures all subsequent date math (remainders, rounding) remains consistent.
4.  **Level Priority**: During re-categorization, always prioritize the current `level` (e.g., Province vs National) to avoid unintended category jumps unless the age change explicitly forces it.

## Apply When

- Running data migrations on Sanity or any NoSQL database.
- Parsing natural language strings for business logic.
- Calculating eligibility based on specific monthly cutoffs.

## Avoid When

- Simple schema changes that can be handled by native migration tools (e.g., Prisma Migrate).
- Very large datasets where a local JSON backup would exceed memory limits.

## Example

```typescript
// Safe Age Calculation for Cutoff
const albinoStart = birthdate.subtract(1, "day");
const age = deadline.diff(albinoStart, "month");

// Modifier-Aware Parsing
const isGreater = entry.includes("มากกว่า");
const min = isGreater ? parseInt(match[1]) + 1 : parseInt(match[1]);
```

## Related

- [2025-12-21_22-22_fix-albino-age-calculation-migration.md](../../logs/jaothui-event/2025-12-21_22-22_fix-albino-age-calculation-migration.md)

## Tags

`migration` `sanity` `process` `dayjs` `thai-logic`
