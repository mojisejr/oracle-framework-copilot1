---
project: oracle
issue: #none
tags: [architecture, memory-structure, optimization]
date: 2025-12-20
agent: oracle-keeper
---

# Snapshot: Oracle Memory 2.0 Reorganization

**Time**: 2025-12-20 23:34
**Context**: Reorganizing the `ψ/memory/logs` structure to improve searchability and manageability across multiple projects.

## Insight
We successfully transitioned from a flat log structure to a **Project-Scoped Architecture**. This change addresses the growing noise in the `logs/` directory and aligns with the "Context Finder" agent's need for targeted search.

**Key Changes:**
1.  **Infrastructure**: Created sub-directories for `mmv-tarots`, `clurian`, `dosage-converter`, `jaothui-event`, `oracle`, and `shared`.
2.  **Migration**: Moved all existing logs to their respective homes using `git mv` to preserve history.
3.  **Metadata**: Enriched all logs with YAML Frontmatter (`project`, `issue`, `tags`, `date`) for programmatic indexing.
4.  **Instruction Alignment**: Updated 8 core instruction files (including `copilot-instructions.md` and `oracle-keeper.agent.md`) to enforce this new structure for all future agents.

## Apply When
- Starting a new project: Create a new folder in `ψ/memory/logs/<new-project>/`.
- Searching for context: Use `grep` scoped to the specific project folder first.

## Tags
`memory-structure` `optimization` `oracle-framework` `multi-project`
