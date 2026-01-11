# /impl - Oracle Implementation Protocol

The **Oracle Implementation Protocol** is a strict workflow designed to ensure code integrity, consistency, and robustness. It transforms "coding" into "systematic delivery".

## Usage

```
/impl [task description]
```

## The 5-Phase Protocol (MANDATORY)

When receiving the `/impl` command, you MUST follow these 5 phases in order. Do not skip any phase.

### Phase 0: Orchestration (Strategic Dispatch)
**"Divide and Conquer."**
1. **Complexity Check**: Evaluate if the task can be parallelized (The Strategy Matrix).
2. **Establish Consensus**: Define File Ownership, Shared Contracts, and **Base Branch** (Strictly `staging` for all Oracle projects).
3. **Multi-Repo Delegation Rule**:
    *   **Root Framework Tasks**: Use `github-pull-request_copilot-coding-agent` (Direct Warp).
    *   **Sub-Project Tasks (projects/*)**: MUST use **Issue-Based Delegation**. Create a GitHub Issue in the target repository and use `mcp_github_github_assign_copilot_to_issue`.
4. **Targeting Rule**: When delegating or starting locally, the base branch MUST be `staging`. Instruct Remote Agents to open PRs against `staging` only.
5. **Native Safety**: 
    *   **NEVER** use `copilot /delegate` in CLI directly.
    *   **ALWAYS** include `CONSENSUS_SCHEMA` and `Task Context` in the agent prompt.
    *   **Monitor**: Add the generated PR link to `focus.md`.

### Phase 1: Grounding (Context First)
**"Don't guess. Know."**
1.  **Identify Project Context**: 
    *   Determine if the task belongs to a **Sub-Project** (`projects/*`) or the **Oracle Framework** (Root).
    *   Check the relevant Git repository for that specific context.
2.  **Git Pre-flight Check**: 
    *   Check current branch using `git branch --show-current`.
    *   **STRICT RULE**: New feature branches MUST be created from `staging` only. (Warn if not on `staging`).
3.  **Explore & Read**: Understand the codebase before making changes.

### Phase 2: Alignment (Pattern Matching)
**"Consistency is King."**
1.  **Branching (Context-Aware)**: Create a new branch `<type>/<name>` in the correct repo.
2.  **Identify Patterns**: Match the existing style and conventions.
3.  **Plan**: Propose a final plan including parallel execution nodes.

### Phase 3: Execution (Simple & Robust)
**"Simple is better than clever."**
1.  **Atomic Changes**: Local implementation.
2.  **Remote Monitoring**: Track progress of dispatched agents.
3.  **Harvesting**: Fetch logs from Remote Agents.

### Phase 4: Verification (Definition of Done)
**"It doesn't work until it builds."**
1.  **Merge & Verify**: Integrate parallel work.
2.  **Build & Lint**: You MUST run build/lint commands.
3.  **Fix**: Rectify any integration conflicts.

## Output Template (Mission Blueprint)

When starting or planning an `/impl` task, you MUST output a **Mission Blueprint**. This serves as the strategic agreement between the Conductor and the Human.

```markdown
# 🛡️ Mission Blueprint: [Task Name]

**Task**: Brief description
**Orchestration Strategy**: [Solo | Parallel (Fleet Mode)]
**Target Environment**: [Project Path + Repository Name]
**Base Branch**: `staging`

## 1. Complexity & Delegation Analysis
Identify if tasks can be split.

| Node | Task Type | Ownership | Tool/Method |
| :--- | :--- | :--- | :--- |
| **A** | Core/Critical | Oracle (Local) | Manual Edit |
| **B** | Modular/UI/Docs | Remote Agent | Warp (Issue #XXX) |

## 2. CONSENSUS_SCHEMA (The Contract)
Define shared types, API endpoints, or component props to ensure integration compatibility.

## 3. Phase 0: Execution Plan (The Warp Point)
1. **Orchestration**: Detail dispatching steps.
2. **Local Work**: Detail local implementation steps.

## 4. Merge & Integration Sequence
Define the strict order of merging to ensure the build stays clean.
1. Local PR -> staging
2. Remote PRs -> staging (Verification)
3. Release PR (staging -> main)

## 5. Protocol Checklist
- [ ] Complexity evaluated
- [ ] Consensus Schema defined
- [ ] Project context identified
- [ ] Current state (Staging) verified
```

## Rules
- **NEVER** skip the Verification phase.
- **NEVER** say "it should work". Prove it with a build.
- **MANDATORY**: Output the Mission Blueprint BEFORE any execution, and wait for human confirmation.
