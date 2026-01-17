# /impl - Lean Oracle Implementation Protocol (HQ-Site Edition)

The **Lean Oracle Implementation Protocol** is a streamlined, solo-focused workflow designed for high-speed, high-integrity delivery. It leverages the **HQ vs Site Zoning** to prevent hallucination while maintaining a strict "Hard Gate" for quality.

## Usage

```
/impl [task description]
```

## The 4-Phase Protocol (Solo Execution)

When receiving the `/impl` command, you MUST follow these 4 phases in order.

### Phase 0: Mission Blueprint (HQ Planning)
**"Measure twice, cut once."**
1.  **Context Sync**: Read `ψ/inbox/focus.md` and relevant `ψ/memory/learnings/`.
2.  **Strategy**: Define the technical approach.
3.  **Blueprint**: Output a **Mission Blueprint** (see template below) and wait for human "Go".

### Phase 1: Warp & Ground (Site Navigation)
**"Step onto the soil with awareness."**
1.  **Navigation**: `cd` into the target project directory (Site).
2.  **Grounding Ritual**: Run `ls -F` or read `package.json` to verify the location.
3.  **Branching**: Create a feature branch from `staging` (pattern: `<type>/<name>`).
4.  **Exploration**: Read the actual code context at the Site.

### Phase 2: Deep Work (Site Execution)
**"Consistency over cleverness."**
1.  **Atomic Edits**: Implement the changes in small, logical blocks.
2.  **Zoning Rule**: EVERY terminal command MUST be prefixed with `cd projects/<name> &&` to ensure PWD integrity.
3.  **Pattern Alignment**: Ensure the new code matches existing styles and conventions.

### Phase 3: The Hard Gate (Verification)
**"It doesn't work until it builds."**
1.  **Sync Staging**: Pull the latest `staging` and resolve any conflicts locally.
2.  **The Hard Gate**: You MUST run the build and lint commands at the Site.
3.  **Requirement**: **100% Build Pass, 0 Linter Errors**. No exceptions.
4.  **Seal**: Commit and push the final, verified code.

## Output Template (Mission Blueprint)

```markdown
# 🛡️ Mission Blueprint: [Task Name]

**Task**: Brief description
**Target Site**: `projects/<name>`
**Base Branch**: `staging`

## 1. Grounding Context
- **Patterns**: [e.g., Service Layer, Zod, Tailwind]
- **Key Files**: [Files to be touched]

## 2. Implementation Plan
1. [Step 1]
2. [Step 2]
3. [Step 3]

## 3. Verification Plan (The Hard Gate)
- [ ] `npm run build`
- [ ] `npm run lint`
```

## Rules
- **NEVER** skip Phase 3 (The Hard Gate).
- **NEVER** assume PWD; always use the `cd &&` prefix in terminal.
- **ALWAYS** confirm the Blueprint with the human before writing code.
