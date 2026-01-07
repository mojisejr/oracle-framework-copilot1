# Snapshot: Phase 4 Implementation Plan - Real Excel Injection
**Timestamp:** 2026-01-07 22:50 (Local)
**Project:** Shared / Oracle Lab (`ψ/lab/royal-export/`)
**Current State**: Dry-run successful (100 Approved records categorized).

## 1. Objective
Transition from Terminal visualization to physical file generation. The goal is to produce 4 perfectly formatted `.xls` (or converted `.xlsx`) files that are ready for printing and field use.

## 2. Phase 4: Detailed Roadmap

### Action 4.1: Template & Buffer Setup
- **Workdir**: Create `ψ/lab/royal-export/output/` if not exists.
- **Copying**: For each category found in data (e.g., `กระบือดำเพศผู้.xls`), clone the raw template from `.tmp/xlsx/` to `output/` to prevent corruption.

### Action 4.2: The Injection Engine (`xlutils` flow)
- **Library**: `xlrd` (read) + `xlutils.copy` (bridging) + `xlwt` (write).
- **Formatting Preservation**: This is the most critical part. We must use `xlutils` to ensure that Row 0-5 (Headers with Thai fonts and borders) remain intact.
- **Data Loop**:
    1. Open Template.
    2. Select the target Sheet by `buffaloAge`.
    3. Start writing at **Row 6** (Index 6).
    4. Fill columns B-V using the mapping established in Phase 2.
    5. Add Row Number (Column A) automatically.

### Action 4.3: Thai Font & Compatibility
- **Encoding**: Ensure `utf-8` handling for Thai characters in `xlwt`.
- **Styling**: Apply a default style (e.g., TH Sarabun New or Angsana New) if the template's style doesn't carry over perfectly.

### Action 4.4: Completion & Artifacts
- **Final Output**: The script will output the paths of generated files.
- **Cleanup**: Remove temporary scratch files.

## 3. Anticipated Challenges
- **XLS vs XLSX**: `xlutils` works strictly with legacy `.xls`. If the user needs `.xlsx`, we will use `openpyxl` (but this requires converting templates first). 
- **Sheet Existence**: If Sanity has data for an age group that doesn't exist in the template, log as a "Warning" and skip or create a "Misc" sheet.

---
**Oracle Status**: Phase 4 "Injection" plan logged. Ready to start implementation of `export_royal.py` Part 2.
