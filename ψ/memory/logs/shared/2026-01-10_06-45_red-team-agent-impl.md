# Snapshot: Red Team Agent Implementation
**Timestamp**: 2026-01-10 06:45 GMT+7
**Issue**: #none

## Context
Implemented a new agent "Red Team" (alias: `red`) into the Oracle Framework. This agent specializes in security auditing and logical flaw detection.

## Implementation Details
- **Agent Definition**: Created `/Users/non/dev/opilot/.claude/agents/red-team.md`.
- **Copilot Native Design**: 
    - Explicitly defined tools usage (`grep_search`, `read_file`).
    - Standardized report format with severity levels and line-linkage.
    - Added an "Audit Workflow" that mimics a real security reconnaissance phase.
- **Project Structure**: Introduced `ψ/memory/logs/shared/audits/` as the standard location for cross-project audit reports.

## Next Steps
- Design an automated audit log template in `templates/`.
- Perform a pilot audit on an existing project (e.g., `mmv-tarots` or `clurian`).

## Verification
- `.claude/agents/red-team.md` exists and follows the Oracle Framework agent pattern.
- `ψ/inbox/focus.md` updated with "in-progress" state for the new agent implementation.
