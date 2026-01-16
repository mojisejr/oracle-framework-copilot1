# Snapshot: Mandatory PWD Check in /impl Protocol

**Time**: 2026-01-16 10:05
**Context**: Debugging a "folder inception" (nested folder) issue during /impl execution.

## Insight

AI memory of "current directory" is unreliable because it is stateless, while the Terminal is stateful. To prevent creating nested folders (e.g., `project/app/project/app`), we must **shift from "Awareness" to "Protocol"**.

We updated `/impl` (Phase 2) to include a **Mandatory Context Verification** step:
1.  **PWD Check**: Always run `pwd`.
2.  **Force Navigation**: Always explicitly `cd` to the absolute path of the target project before running commands.

## Apply When

- Every time `/impl` is executed.
- Every time we start a new session or switch contexts.
- When running `mkdir` or scaffolding commands.

## Tags

`protocol` `safety` `terminal` `context`
