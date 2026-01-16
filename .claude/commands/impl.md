# /impl - Oracle Implementation Protocol

The **Oracle Implementation Protocol** is a strict workflow designed to ensure code integrity, consistency, and robustness. It transforms "coding" into "systematic delivery".

## Usage

```
/impl [task description]
```

## The 5-Phase Protocol (Local Swarm Edition)

When receiving the `/impl` command, you MUST follow these 5 phases in order. Do not skip any phase.

### Phase 0: Planning & Blueprint
**"AI prepares the contract, Human pulls the trigger."**
1.  **Complexity Check**: Evaluate `Modularity` vs `Friction`. Suggest **Solo** or **Swarm**.
2.  **Contract Construction**: Use `templates/swarm-plan.md` to draft the "Mission Blueprint" (`plan.md`).
    -   Define Blocks (Main, Swarm-A, Swarm-B).
    -   Generate `git worktree` commands.
3.  **Scope Initialization**: Check if `ψ/active/<project>/focus.md` exists. If not, create it using `templates/scoped-focus.md`.
4.  **Hand-off**: Present the `plan.md` and wait for the human to setup the environment.

### Phase 1: Soil Preparation (Git Worktree)
**"Isolate the workspace."**
1.  **Human Action**: Run the provided `git worktree add` commands.
2.  **Window Management**: Open new VS Code windows for each worktree.

### Phase 2: Swarm Execution (Parallel)
**"Work in parallel, see the same truth."**
1.  **Context Loading**: In each window, the AI reads the shared `plan.md` and the scoped `active/.../focus.md`.
2.  **Execution**: Agents implement their assigned blocks.
3.  **Local Commit**: Swarm agents commit to their temporary branches.

### Phase 3: Harmonization & Verification
**"Main Session is the Guardian of Truth."**
1.  **Force Sync**: Main Session runs `git merge <swarm-branch>`.
2.  **Conflict Resolution**: Resolve any merge conflicts locally.
3.  **Build & Lint (The Hard Gate)**: Run build/lint commands. **100% Pass Required**.
4.  **Cleanup**: `git worktree remove <path>` after successful merge.

### Phase 4: Final Commit
**"Seal the history."**
1.  Commit the harmonized code to the main feature branch.

## Output Template (Mission Blueprint)

See `templates/swarm-plan.md` for the full structure.

**Task**: Brief description
**Orchestration Strategy**: [Solo | **Parallel (HITL Edition)**]
**Target Environment**: [Project Path + Repository Name]
**Base Branch**: `staging`

## 1. Delegation & Local Work Plan
| Node | Task Description | Ownership | Hand-off Point |
| :--- | :--- | :--- | :--- |
| **A** | Core Logic / Backend | Oracle (Local) | N/A |
| **B** | UI / Docs / Modular Task | Remote Agent | **GitHub Issue #XXX** (for Human to assign) |

## 2. CONSENSUS_SCHEMA (The Contract)
*Shared types and constants to prevent conflicts.*

## 3. Harmonization Sequence (The Merge Plan)
1.  **Human**: Merge Remote PR (from Issue #XXX) into `staging`.
2.  **Human**: Notify AI.
3.  **AI**: `git pull origin staging` into local branch.
4.  **AI**: Resolve conflicts & run `npm run build`.
5.  **AI**: Commit final changes.
```

## Rules
- **NEVER** auto-assign issues to Copilot. This is a human's role.
- **NEVER** skip the Harmonization & Verification phase.
- **MANDATORY**: The build must pass 100% before declaring the task complete.
