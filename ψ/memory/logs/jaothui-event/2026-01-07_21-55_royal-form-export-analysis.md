# Snapshot: Royal Form Export Analysis & Data Mapping
**Timestamp:** 2026-01-07 21:55 (Local)
**Project:** Jaothui Event / Jaothui Dashboard
**Issue ID:** #none (Context: Custom Export Request)

## 1. Requirement Overview
User wants to export registration data from "Royal Form" into a specific Excel format (.xlsx) provided by them. The export should be filtered by `eventId`.

## 2. Technical Context & Data Architecture
- **Primary Data Store**: Sanity CMS (Not Prisma).
- **Schema Type**: `eventRegister`
- **Key Models (Sanity)**:
  - `eventRegister`: Main document.
    - Fields: `name` (Buffalo), `type`, `level`, `sex`, `color`, `birthday`, `microchip`, `ownerName`, `ownerTel`, `fatherName`, `motherName`, `farmName`, `province`.
  - `approvment`: Linked document containing approval status and comments.
  - `eventAddress`: Linked document containing detailed address (`address`, `district`, `amphoe`, `zipcode`).
  - `eventImage`: Linked document for file uploads (Front, Side, Back, etc.).

## 3. Existing Export Implementation
- **Location**: `projects/jaothui-dashboard/src/server/api/routers/r-sanity.ts`
- **Logic**: 
  - Fetches data from Sanity via GROQ.
  - Uses `xlsx` library to generate workbook.
  - Current structure: Groups registrations into multiple sheets based on `Type-AgeRange-Color-Sex`.
  - Uses a helper `createHierarchicalSheet` to format headers.

## 4. Analysis of Royal Form Structure
The Royal Form (`RoyalForm.tsx`) covers:
- Participant Details: First/Last Name, Tel, Full Address.
- Asset (Buffalo) Details: Name, Microchip, Birthdate, Color, Sex.
- Competition Details: Level (e.g., Country), Type.
- Pedigree Info: Father Name, Mother Name, Farm Name.
- Compliance: Multiple check-boxes (`accept1-9`, `d1-3`).

## 5. Implementation Strategy for Custom Export
1. **Analyze User XLSX**: Need to script-read the user's template to match column headers.
2. **GROQ Query Update**: Ensure all address and approvement data are joined in the Sanity fetch.
3. **Template Mapping**: Create a new function (or refactor `createHierarchicalSheet`) to map Sanity JSON to the exact column indexes of the target template.
4. **Download Handler**: Use the existing buffer-to-zip/xlsx logic in `jaothui-dashboard`.

## 6. Next Steps
- [ ] User to provide the `.xlsx` template file path.
- [ ] Read and extract headers from the provided template.
- [ ] Implement `exportRoyalCustom` procedure in `r-sanity.ts`.

---
**Oracle Note**: Nothing is deleted. The existing export logic should remain as a fallback, while the custom template logic is added as a new feature or toggle.
