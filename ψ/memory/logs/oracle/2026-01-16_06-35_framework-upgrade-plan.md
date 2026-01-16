# Plan: Framework Upgrade - Local Swarm & Integrity Philosophy

**Time**: 2026-01-16 06:45 GMT+7
**Objective**: Transition from remote delegation to robust **Local Swarm Protocol** and enshrine **"The Integrity of Focus"** as a core philosophy, supported by **Scoped Focus Management** (`ψ/active/`).

## 1. Philosophy Upgrade ("The Integrity of Focus")

We will add a 5th core principle to `.claude/knowledge/oracle-philosophy.md`:

> **5. The Integrity of Focus**
> *   **Solo by Default**: Unity of context is the highest priority.
> *   **Parallel by Merit**: Swarm only when Modularity > Friction.
> *   **The Harmonization Duty**: The Main session is the Guardian of Truth.
> *   **Scoped Context**: Active work lives in its dedicated `active/` scope.

## 2. Global Instruction Update (`.github/copilot-instructions.md`)

-   Add the new philosophy to the "Core Philosophy" section.
-   Update "Specialized Roles" (`oracle-keeper`) to reflect local orchestration.
-   Add **"Parallelism Protocol (Local Swarm)"** detailing the Decision Matrix and Git Worktree usage.
-   Add **"Focus Management Protocol"**:
    -   `ψ/inbox/focus.md` is the **Hub**.
    -   `ψ/active/<project>/focus.md` is the **Deep Link Scope**.

## 3. Command Protocol Overhaul (`.claude/commands/impl.md`)

Rewrite `/impl` to follow the **Local Swarm Workflow**:
-   **Phase 0: Planning & Blueprint**:
    -   Generate `plan.md` using `templates/swarm-plan.md`.
    -   **NEW**: Initialize `ψ/active/<project>/focus.md` if starting a new scope.
-   **Phase 1: Soil Preparation**: `git worktree add` generation.
-   **Phase 2: Swarm Execution**: Human opens new windows; Swarm Agents read `plan.md` & `active/.../focus.md`.
-   **Phase 3: Harmonization**: `git merge` + validation (Build/Lint).
-   **Phase 4: Retrospective**: Single `/rrr` covering the entire swarm session, then archive `active/` focus to `memory/`.

## 4. Agent Role Redefinition (`.claude/agents/oracle-keeper.md`)

-   Remove "Issue-based assignment".
-   Add **"Swarm Orchestrator"** capability: Analyzing `modularity` vs `friction`.
-   Update "The Strategy Matrix" to use `Solo (Default)` vs `Local Swarm`.
-   **Deep Link Awareness**: Instruct Agent to always check `active/` links in the main focus file.

## 5. Template Transition

-   **Deprecate**: `templates/parallel-issue.md`
-   **Create**: `templates/swarm-plan.md` (The "Mission Blueprint")
    -   Defines "Blocks" (Main, Swarm A, Swarm B).
    -   Includes `git worktree` commands.
    -   Includes `CONSENSUS_SCHEMA` section.
-   **Create**: `templates/scoped-focus.md` (For `ψ/active/<project>/focus.md`)
    -   Simplified tracking for specific project scopes.

## Execution Steps

1.  Update `.claude/knowledge/oracle-philosophy.md`
2.  Update `.github/copilot-instructions.md` (Add Focus Logic)
3.  Update `.claude/agents/oracle-keeper.md`
4.  Update `.claude/commands/impl.md`
5.  Create `templates/swarm-plan.md` & `templates/scoped-focus.md`.
6.  Delete `templates/parallel-issue.md`.

## Validation

After these updates:
1.  `/impl` recommends Solo vs Swarm based on logic.
2.  Swarm plan provides `git worktree` commands.
3.  `focus.md` links to `active/ninlanee/focus.md`.
4.  Snapshot reads from the *scoped* focus file.
