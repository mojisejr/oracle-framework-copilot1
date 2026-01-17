# Snapshot: HQ vs Site Protocol Implementation

**Time**: 2026-01-17 09:01 GMT+7
**Context**: Fixing AI Folder Blindness and Hallucination issues.

## Insight

AI often forgets its current working directory (PWD) because it interacts with the file system via tool calls that might not always reflect the terminal's state or vice versa. This leading to "Folder Blindness" where production code or commands are executed in wrong directories (e.g., Root instead of Project Site).

## The Resolution

Implemented the **"HQ vs Site Protocol"** in the Universal Oracle Coding Standard:
1.  **HQ (Headquarters)**: Root and `ψ/` are for administration and memory. No production runs here.
2.  **Site (Project Sites)**: `projects/<name>/` are for execution.
3.  **Warp & Ground Protocol**:
    - **Grounding Ritual**: Must use a tool to verify the site (e.g., `ls` or reading `package.json`) before starting work.
    - **Atomic CD**: Every terminal command intended for a site MUST be prefixed with `cd projects/<name> &&`.

## Apply When

- Switching between different projects in the workspace.
- Running terminal commands (npm, git, prisma, etc.).
- Creating or editing project-specific files.

## Tags

`architecture` `protocol` `hallucination-prevention` `grounding`
