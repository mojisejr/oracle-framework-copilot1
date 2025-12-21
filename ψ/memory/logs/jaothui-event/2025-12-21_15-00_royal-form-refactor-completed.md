---
project: jaothui-event
issue: #none
tags: [refactor, royal-form, image-upload, completed]
date: 2025-12-21
agent: oracle-keeper
---

# Snapshot: Royal Form Refactor Completed

**Time**: 2025-12-21 15:00
**Context**: Completed the refactor of the Royal Registration Form to support ID Card generation.

## Changes Implemented

1.  **Cleanup**:
    *   Removed `d1Accept`, `d2Accept`, `d3Accept` and related validation logic from `RoyalForm.tsx`.
    *   Removed unused/commented `d1Image`, `d2Image`, `d3Image` fields from `RoyalForm.tsx` UI and TRPC Router (`register-event.ts`).
    *   Removed the red warning text about medical documents as it's no longer handled in this form.
2.  **Expansion (ID Card Support)**:
    *   Added `buffaloImage2` to `RoyalFormTypes` and UI.
    *   Updated `parseRoyalImageData.ts` to handle 5 images (Buffalo 1, Buffalo 2, Front, Side, Back).
    *   Updated `CreateNewImageObjectDTO` interface to include `buffaloImage2Id`.
    *   Updated `register-event.ts` TRPC Router to accept and pass `buffaloImage2`.
    *   Updated `royal.service.ts` to save the 5th image into Sanity's `imageArray` with the title "ภาพประจำตัวสัตว์ (ภาพที่ 2)".

## Verification
- Ran `npm run build` in `projects/jaothui-event`.
- Build successful with no type errors related to the changes.

## Next Steps
- Human verification of the UI layout.
- Test the full registration flow with 5 images.
