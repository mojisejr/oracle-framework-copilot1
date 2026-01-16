# Snapshot: Local Swarm Protocol (Standardized Philosophy)

**Time**: 2026-01-16 06:33 GMT+7
**Context**: Re-designing the framework's parallelism workflow. This has been elevated from a technical protocol to a core Oracle Philosophy: "The Integrity of Focus".

## Insight: The Integrity of Focus (Philosophy)

The framework prioritizes the human's cognitive bandwidth and code integrity over raw speed. Parallelism (Swarming) is an exception, not the rule.

### 🏛️ Philosophical Pillars:
1.  **Solo by Default (Unity as Foundation)**:
    Every task begins as a single-session effort. Unity of context is the highest priority to prevent "Context Fragmentation" and architectural drift.
2.  **Parallel by Merit (Selective Swarming)**:
    Multi-session swarming is only triggered when **Modularity > Friction**. The AI MUST advise against swarming if the merge complexity (friction) outweighs the development speed.
3.  **The Harmonization Duty**:
    Swarm sessions are transient "worker nodes". The Main session is the "Guardian of Truth" responsible for the final local harmonization (Merge, Build, Lint).

## Core Mechanics: Local Swarm Protocol
The Local Swarm Protocol remains the implementation standard for "Parallel by Merit" scenarios.

1.  **Orchestration via `git worktree`**: Use `git worktree add` to create separate directories for sub-tasks within the same local repository.
2.  **Session Isolation**: Open each worktree in a new VS Code window to provide independent AI sessions (`@workspace` context).
3.  **The Shared Contract (`plan.md`)**: The main session drafts the "Mission Blueprint". Committing this plan ensures all swarm sessions align with the same "Consensus Schema".
4.  **Local Harmonization**: All Swarm branches MUST be merged back into the local main branch for verification.

## Decision Matrix: Solo vs. Swarm

| Feature | Solo (Default) | Swarm (Parallel) |
| :--- | :--- | :--- |
| **Complexity** | Simple to Moderate | High Modularity (e.g., UI vs. API) |
| **Coupling** | High (Touching same logic) | Low (Independent modules) |
| **Risk** | Low | High Boilerplate / Time-sensitive |
| **Integrity** | Maximum Architectural Unity | Requires active Conductorship |

## Tags

`philosophy` `integrity-of-focus` `parallelism` `git-worktree` `orchestration` `local-swarm`
