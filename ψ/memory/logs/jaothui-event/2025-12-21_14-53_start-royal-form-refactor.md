---
project: jaothui-event
issue: #none
tags: [refactor, royal-form, image-upload]
date: 2025-12-21
agent: oracle-keeper
---

# Snapshot: Starting Royal Form Refactor

**Time**: 2025-12-21 14:53
**Context**: Starting the refactor of the Royal Registration Form in `jaothui-event`.

## Plan

1.  **Cleanup**: Remove all references to `d1Image`, `d2Image`, and `d3Image` (currently commented out or unused) from:
    *   `src/components/Events/RoyalForm.tsx`
    *   `src/server/api/routers/register-event.ts`
2.  **Expansion**: Add `buffaloImage2` for ID Card support:
    *   Update `RoyalFormTypes` in `RoyalForm.tsx`.
    *   Add UI input for the 2nd buffalo image.
    *   Update `parseRoyalImageData.ts` to include the 5th image.
    *   Update TRPC Router input schema and service calls.
    *   Ensure Sanity service handles the 5th image correctly.

## Current State
- Form currently handles 4 images.
- `d1-d3` fields are present but unused/commented.
- Goal is to have 5 mandatory images for ID Card generation.

## Next Step
- Begin cleanup of `d1-d3` in `RoyalForm.tsx`.
