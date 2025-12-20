# Snapshot: Jaothui Event Royal Form Analysis

**Time**: 2025-12-20 22:47
**Context**: Checking Royal Form and Royal Registration Form implementation in `jaothui-event` project.

## Insight

- **Current Image Implementation**: The form currently handles 4 images:
  1. `buffaloImage` (ภาพประจำตัวสัตว์)
  2. `frontImage` (ภาพถ่ายหน้าตรงกระบือ)
  3. `sideImage` (ภาพถ่ายด้านข้างกระบือ)
  4. `backImage` (ภาพถ่ายด้านท้ายกระบือ)
- **Data Flow**:
  - `RoyalForm.tsx` uses `useForm` to collect files.
  - `parseRoyalImageData.ts` prepares the image array.
  - `image-upload.service.ts` handles the actual upload to Sanity.
  - `register-event.ts` (TRPC Router) calls `createNewImageObjects` in `royal.service.ts`.
- **Database Structure**: Sanity CMS uses an `eventImage` document with an `imageArray` field. Each element in the array has an `imageTitle` and `imageAsset`.
- **Future Expansion**: There are commented-out fields for `d1Image`, `d2Image`, and `d3Image` in both the frontend and backend, suggesting a planned expansion for medical/vaccination documents.

## Apply When

Implementing the additional (5th) image upload for the Royal Registration flow.

## Tags

`jaothui-event` `sanity-cms` `royal-form` `image-upload` `registration-flow`
