# Learning: Multi-Project Git Isolation & Phase-Based Development

**Date**: 2025-12-18
**Context**: Developing the "Dosage Converter" sub-project within the Oracle Framework.

## The Pattern: Git Isolation

When managing multiple sub-projects within a central "Knowledge Hub" (Oracle Framework), a simple folder structure is insufficient. To maintain clean history and prevent repository pollution:
1.  **Root Isolation**: The root `.gitignore` must explicitly ignore the `projects/` directory.
2.  **Independent Repositories**: Each sub-project must be initialized with its own `git init`.
3.  **Knowledge vs. Code**: The Oracle Framework (`ψ/`) stores the *why* (logs, retrospectives, snapshots), while the sub-project stores the *how* (source code).

## The Strategy: Phase-Based Implementation

Breaking a feature into atomic phases reduces integration friction:
- **Phase 1 (Logic)**: Implement core functionality (hooks, state) and verify with a raw debug page.
- **Phase 2 (UI)**: Build and test design components in isolation (e.g., `/ui-test`).
- **Phase 3 (Assembly)**: Connect verified logic to verified UI.
- **Phase 4 (Refinement)**: SEO, validation, and UX polish.

**Result**: 100% build success rate on the first assembly attempt.

## Technical Insight: Liquid Glass 2.0

Achieving a "Premium" 2025 aesthetic requires more than just transparency:
- **OKLCH Colors**: For consistent vibrancy across devices.
- **Noise Textures**: SVG filters add tactile depth and prevent gradient banding.
- **Mesh Gradients**: Multiple overlapping radial gradients create organic, fluid backgrounds.
- **Backdrop Filters**: Combining `blur`, `saturate`, and `contrast` for a true "liquid" feel.

## Oracle Principle: Archive Over Delete

Instead of deleting debug or test pages, move them to `ψ/lab/[project]/archive/`. This honors the **"Nothing is Deleted"** principle, allowing future sessions to reference the development process without cluttering the production codebase.

## Tags
`git-isolation` `architecture` `nextjs` `tailwind-v4` `liquid-glass` `oracle-principles`
