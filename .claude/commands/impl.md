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
1.  **Explore**: Use `grep_search` or `list_dir` to understand the current directory structure and relevant files.
2.  **Read**: Read the actual content of related files to understand the "vibe" and existing logic.
3.  **State**: Confirm the current state of the codebase before making changes.

### Phase 2: Alignment (Pattern Matching)
**"Consistency is King."**
1.  **Identify Patterns**: Look for existing conventions (naming, folder structure, libraries used).
2.  **Match Style**: Decide how to implement the new feature so it looks like it was written by the original author.
3.  **Plan**: Propose a short plan to the user.

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

## Phase 1: Grounding
- [ ] Context acquired (Files: ...)
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
