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
2. **Establish Consensus**: Define File Ownership and Shared Contracts.
3. **Delegation**: If Parallel, dispatch Remote Agents via GitHub Issues. Create a `consensus-log` in `ψ/memory/logs/`.

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

## Output Template

When starting an `/impl` task, output this checklist:

```markdown
# 🛡️ Oracle Implementation Protocol (v2 Parallel)

**Task**: [Task Name]
**Context**: [Oracle Framework | Sub-Project: Name]
**Strategy**: [Solo | Parallel (Fleet: @agent1, @agent2)]

## Phase 0: Orchestration
- [ ] Complexity evaluated
- [ ] Consensus Schema defined
- [ ] Agents dispatched (if applicable)

## Phase 1: Grounding
- [ ] Project context identified
- [ ] Current state verified

## Phase 2: Alignment
- [ ] Patterns identified
- [ ] Deployment sequence planned

## Phase 3: Execution
- [ ] Local changes applied
- [ ] Remote logs harvested

## Phase 4: Verification
- [ ] Build passed
- [ ] Lint passed
```

## Rules
- **NEVER** skip the Verification phase.
- **NEVER** say "it should work". Prove it with a build.
- If the build takes too long, at least run a type check (`tsc --noEmit`).
