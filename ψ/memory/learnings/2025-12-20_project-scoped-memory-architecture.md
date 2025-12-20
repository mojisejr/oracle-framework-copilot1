# Learning: Project-Scoped Memory Architecture

**Date**: 2025-12-20
**Context**: Reorganizing `ψ/memory/logs` for a multi-project workspace.

## The Pattern: Scoped Memory
In a workspace with multiple active projects, a flat log structure leads to "Context Pollution" and inefficient searching. By organizing logs into `<project_name>/` sub-directories, we achieve:
1. **Search Efficiency**: `grep` and semantic search can be scoped to a specific path, reducing noise and latency.
2. **Logical Isolation**: Project-specific snapshots don't clutter the general knowledge base.
3. **Metadata Integrity**: Using YAML frontmatter allows for advanced filtering and indexing beyond simple text search.

## The Strategy: Instruction-Driven Structure
Changing the folder structure is only half the battle. To ensure the change is permanent and followed by future AI agents:
- **Update Core Instructions**: `copilot-instructions.md` must define the new storage rules.
- **Update Agent Definitions**: Agents like `context-finder` must be taught to prioritize scoped paths.
- **Update Command Templates**: Commands like `/snapshot` must be hardcoded to use the new path logic.

## Technical Insight: YAML Frontmatter in Markdown
Adding a standardized YAML block at the top of every log file transforms a collection of text files into a queryable database.
```yaml
---
project: mmv-tarots
issue: #31
tags: [auth, workflow]
date: 2025-12-20
agent: oracle-keeper
---
```

## Oracle Principle: History Preservation
Always use `git mv` when reorganizing memory. This ensures that the "Sacred History" is preserved and that the evolution of a thought or project can be traced back to its origin, even if its location has changed.

## Tags
`architecture` `memory-management` `multi-project` `metadata` `oracle-principles`
