# Snapshot: Lean Oracle Implementation Protocol (v3)

**Time**: 2026-01-17 09:16 GMT+7
**Context**: Retiring the high-friction Parallelism workflow in favor of a Lean Solo workflow.

## Insight

While Parallelism (Local Swarm/HITL) has potential for massive scale, its current implementation creates too much friction and cognitive load for a single Copilot agent. The overhead of issue management and synchronization outweighs the speed gains for most modular tasks.

## The Resolution

Successfully refactored `/impl` command at [.claude/commands/impl.md](.claude/commands/impl.md) to the **Lean HQ-Site Edition**:
1.  **Removed 5-Phase Parallelism**: Eliminated Phase 0 (Orchestration) and Phase 3 (Remote Monitoring).
2.  **Integrated Zoning**: Enforced Phase 1 (Warp) and Phase 2 (Site Execution) with strict PWD integrity rules.
3.  **Preserved The Hard Gate**: Kept the mandatory 100% build/lint pass requirement.
4.  **Blueprint Simplified**: Updated the Mission Blueprint template to focus on site-specific execution.

## Apply When

- Implementing any feature, bug fix, or refactoring using the `/impl` command.
- Working across multiple projects (Sites) in the workspace.

## Tags

`protocol` `lean` `solo-optimization` `impl` `refactoring`
