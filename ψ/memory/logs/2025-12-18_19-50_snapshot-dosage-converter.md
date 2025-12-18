# Snapshot: 2025-12-18 19:50 - Dosage Converter Design & Research

**Issue**: #5
**Model**: Gemini 3 Flash (Preview)
**Tier**: Free Tier (Tier Optimization Active)

## Context
User requested a Next.js project for a pesticide dosage converter with a "Liquid Glass 2025" design style, using `localStorage` for data persistence and `shadcn/ui` for components.

## Current State
- **Project Path**: `projects/dosage-converter/`
- **Framework**: Next.js 15 (App Router, TypeScript, Tailwind CSS)
- **Design Research**: Completed research on Liquid Glass 2025 style (Mesh gradients, advanced glassmorphism, organic shapes).
- **Architecture**: 
    - No database/login required.
    - Persistence via `localStorage`.
    - UI via `shadcn/ui`.
- **Wireframe**: ASCII UI designed with a focus on real-time calculation and history tracking.

## Actions Taken
- Initialized Next.js project.
- Configured `.gitignore` to respect Oracle Framework boundaries.
- Conducted web research on 2025 UI trends.
- Defined `localStorage` schema.

## Decisions
- Use `lucide-react` for icons.
- Implement a custom Tailwind configuration for "Liquid Glass" effects (blur, transparency, mesh gradients).
- Keep the logic atomic within a custom hook (e.g., `useDosageCalculator`).

## Next Steps
- Install `shadcn/ui` and required components.
- Implement the core calculation logic.
- Build the Liquid Glass UI.
