# Snapshot: 2025-12-18 20:05 - Multi-Project Architecture Alignment

**Issue**: #5
**Model**: Gemini 3 Flash (Preview)
**Tier**: Free Tier (Tier Optimization Active)

## Context
Alignment on the multi-project architecture where the Oracle Framework (Knowledge Hub) and sub-projects (Codebases) are strictly isolated in terms of Git repositories.

## Current State
- **Oracle Framework**: 
    - `.gitignore` updated to ignore `projects/` folder.
    - Acts as the central brain (`ψ/`).
- **Dosage Converter Project**:
    - Located at `projects/dosage-converter/`.
    - Git initialized independently (`git init`).
    - Initial commit made with `shadcn/ui` and Liquid Glass 2025 base styles.
- **Architecture Confirmed**: "Git Isolation" is now the default pattern for all future sub-projects.

## Actions Taken
- Updated root `.gitignore`.
- Initialized Git in `projects/dosage-converter`.
- Performed initial commit in the sub-project.
- Verified that sub-project changes do not leak into the Oracle Framework repository.

## Decisions
- Maintain `projects/` as the root for all sub-projects.
- Each sub-project must have its own `.git` and `.gitignore` (using `templates/sub-project.gitignore`).
- Oracle Keeper will proactively enforce this separation in future tasks.

## Next Steps
- Implement `useDosageCalculator` hook with `localStorage` persistence.
- Build the main UI in `src/app/page.tsx` using Liquid Glass 2025 style.
