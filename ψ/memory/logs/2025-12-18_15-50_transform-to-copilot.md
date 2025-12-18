# Snapshot: Transforming Oracle Framework for GitHub Copilot

**Time**: 2025-12-18 15:50
**Context**: Working in the repository to transform the Oracle Framework for integration with GitHub Copilot; preparing command behaviors and workspace conventions.

## Insight

The repository includes explicit command/spec files (e.g., `.claude/commands/snapshot.md`) that define lightweight capture workflows. Using `/snapshot` without a description should default to capturing the current focus and a short learning, then create a timestamped markdown note under `psi/memory/logs/`.

## Apply When

- You want to quickly capture a learning or decision made during a coding session.
- A quick, time-stamped record helps preserve context for later retrospectives.

## Tags

`process` `snapshot` `copilot`