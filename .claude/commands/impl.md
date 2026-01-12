# /impl - Oracle Implementation Protocol

The **Oracle Implementation Protocol** is a strict workflow designed to ensure code integrity, consistency, and robustness. It transforms "coding" into "systematic delivery".

## Usage

```
/impl [task description]
```

## The 5-Phase Protocol (HITL Edition)

When receiving the `/impl` command, you MUST follow these 5 phases in order. Do not skip any phase.

### Phase 0: Planning & Issue Scaffolding
**"AI prepares the contract, Human pulls the trigger."**
1.  **Complexity Check**: Evaluate if the task can be parallelized.
2.  **Contract Construction**: Use `templates/parallel-issue.md` to draft the content for the GitHub Issue. This includes the `CONSENSUS_SCHEMA`, scope, and constraints.
3.  **Issue Creation**: Create a new GitHub Issue in the target repository with a title `[Warp] [Task Name]`.
4.  **Hand-off**: Present the link to the created Issue to the user. **DO NOT** use any tool to auto-assign the issue. Update `focus.md` with the issue link.

### Phase 1: Grounding (Local Context)
**"Don't guess. Know."**
1.  **Branching**: Create a local feature branch from `staging`.
2.  **Exploration**: Read relevant files for the local part of the task.

### Phase 2: Alignment (Local Patterns)
**"Consistency is King."**
1.  **Identify Patterns**: Match the existing style for the local implementation.
2.  **Local Plan**: Finalize the plan for the code you will write locally.

### Phase 3: Parallel Execution
**"Work in parallel, integrate in sequence."**
1.  **Local Execution**: Implement the local tasks.
2.  **Remote Monitoring**: Wait for the user to confirm that the remote PR (from the issue you created) has been merged into `staging`.

### Phase 4: Harmonization & Verification
**"Staging is the single source of truth."**
1.  **Force Sync**: After user confirmation, pull the latest `staging` branch into your local feature branch.
2.  **Conflict Resolution**: Resolve any merge conflicts locally. This is the designated "battleground".
3.  **Build & Lint (The Hard Gate)**: You MUST run the build and lint commands. The build MUST pass 100% with no errors.
4.  **Final Commit**: Commit the harmonized code. The task is only "Done" after this build passes.

## Output Template (Mission Blueprint)

When starting an `/impl` task, you MUST output a **Mission Blueprint**.

```markdown
# 🛡️ Mission Blueprint: [Task Name]

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
