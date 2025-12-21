# Snapshot: Successful Migration of Albino Cohorts

**Time**: 2025-12-21 22:32
**Context**: Completed the execution of `fix-albino-cohorts.ts` on the production dataset for `jaothui-event`.

## Insight

1.  **Execution Result**:
    *   Successfully updated **27 albino buffalo records**.
    *   Corrected age calculation (subtracting 1 day for albino logic).
    *   Re-assigned cohorts based on new age, resolving the "12 months vs >12 months" overlap issue.

2.  **Security & Cleanup**:
    *   **Backup**: Created a full backup of `eventRegister` before execution (`backups/event-registers-backup-*.json`).
    *   **Cleanup**: Deleted the backup file after verifying success to prevent stale data retention.
    *   **Scripts**: Retained `scripts/fix-albino-cohorts.ts` and `scripts/backup-event-registers.ts` for future reference.
    *   **Secrets Check**: Verified that scripts use `dotenv` and `process.env` exclusively. No hardcoded tokens or secrets are present in the codebase.

3.  **Verification**:
    *   Logs confirmed age shifts (e.g., 12 -> 13 months) and cohort updates.
    *   No errors reported during the batch patch process.

## Apply When

*   Referencing the migration history for Event ID `44da822e-7ec6-4e82-b530-a2ef06759f24`.
*   Reusing the "Backup -> Dry Run -> Execute -> Cleanup" workflow for future data patches.

## Tags

`jaothui-event` `migration` `success` `security-check`
