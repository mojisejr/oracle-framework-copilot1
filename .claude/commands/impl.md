# /impl - Oracle Implementation Protocol

The **Oracle Implementation Protocol** is a strict workflow designed to ensure code integrity, consistency, and robustness. It transforms "coding" into "systematic delivery".

## Usage

```
/impl [task description]
```

## The 4-Phase Protocol (MANDATORY)

When receiving the `/impl` command, you MUST follow these 4 phases in order. Do not skip any phase.

### Phase 1: Grounding (Context First)
**"Don't guess. Know."**
1.  **Identify Project Context**: 
    *   Determine if the task belongs to a **Sub-Project** (`projects/*`) or the **Oracle Framework** (Root).
    *   Check the relevant Git repository for that specific context.
2.  **Git Pre-flight Check**: 
    *   Check current branch using `git branch --show-current` (in the correct context).
    *   **STRICT RULE**: New feature branches MUST be created from `staging` only.
    *   **WARNING**: If the current branch is NOT `staging`, you MUST stop and warn the human. DO NOT proceed with any file changes or branch creation until the human gives an explicit command to switch or proceed.
3.  **Explore**: Use `grep_search` or `list_dir` to understand the current directory structure and relevant files.
3.  **Read**: Read the actual content of related files to understand the "vibe" and existing logic.
4.  **State**: Confirm the current state of the codebase before making changes.

### Phase 2: Alignment (Pattern Matching)
**"Consistency is King."**
1.  **Branching (Context-Aware)**: 
    *   **Sub-Project**: `cd` into the project folder and create a branch in its own repository.
    *   **Oracle Framework**: Create a branch in the root repository.
    *   **STRICT RULE**: Only Oracle-specific tasks can manage branches in the root repository.
    *   Create a new branch from `staging` using the pattern: `<type>/<name>` (e.g., `feat/mimi-soul`, `fix/centering`, `refactor/auth`).
    *   NEVER create a branch from another feature branch.
2.  **Identify Patterns**: Look for existing conventions (naming, folder structure, libraries used).
3.  **Match Style**: Decide how to implement the new feature so it looks like it was written by the original author.
4.  **Plan**: Propose a short plan to the user.

### Phase 3: Execution (Simple & Robust)
**"Simple is better than clever."**
1.  **Atomic Changes**: Make small, focused edits.
2.  **Robustness**: Handle edge cases and errors gracefully.
3.  **Type Safety**: No `any`. Use strict typing.

### Phase 4: Verification (Definition of Done)
**"It doesn't work until it builds."**
1.  **Build**: You MUST run the build command (e.g., `npm run build`, `next build`) to verify integrity.
2.  **Lint**: You MUST run the linter (e.g., `npm run lint`) to check for style violations.
3.  **Fix**: If errors occur, fix them immediately. Do not report success until the build passes.

## Output Template

When starting an `/impl` task, output this checklist:

```markdown
# 🛡️ Oracle Implementation Protocol

**Task**: [Task Name]
**Context**: [Oracle Framework | Sub-Project: Name]

## Phase 1: Grounding
- [ ] Project context identified
- [ ] Context-specific Git state verified
- [ ] Current state verified

## Phase 2: Alignment
- [ ] Pattern identified: [e.g., Service Layer, Zod Validation]
- [ ] Plan proposed

## Phase 3: Execution
- [ ] Implementation started
- [ ] Code written (Simple + Robust)

## Phase 4: Verification
- [ ] Build passed (`npm run build`)
- [ ] Lint passed
```

## Rules
- **NEVER** skip the Verification phase.
- **NEVER** say "it should work". Prove it with a build.
- If the build takes too long, at least run a type check (`tsc --noEmit`).
