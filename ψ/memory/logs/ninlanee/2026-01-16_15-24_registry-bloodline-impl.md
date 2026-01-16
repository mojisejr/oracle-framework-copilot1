# Snapshot: Registry Form Bloodline Implementation

**Time**: 2026-01-16 15:24
**Context**: Implementing Phase 2 (Bloodline Logic) for Ninlanee Registry.

## Insight

Implementation of the Pedigree selection system required a 3-step wizard approach to keep the UI clean.

1.  **Architecture**: Split `RegistryForm` into steps:
    -   Step 1: Bio Data
    -   Step 2: Images
    -   Step 3: Bloodline (Sire/Dam Selection)
2.  **Components**: Created `BloodlineSearch` handling async server actions + debounce + visuals.
3.  **Hooks**: Implemented `useDebounce` locally to avoid heavy external deps.
4.  **Types**: Managed strict null/undefined checks between `BloodlineSearch` (return null) and `zod` schema (expects optional/undefined).

## Apply When

-   Building multi-step forms in Next.js.
-   Handling searching for relation fields in forms.

## Tags

`ninlanee` `registry` `bloodline` `nextjs` `server-actions`
