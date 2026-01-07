# Snapshot: Royal Form Export - Lab Phase Plan
**Timestamp:** 2026-01-07 22:05 (Local)
**Project:** Shared / Oracle Lab (`ψ/lab/`)
**Issue ID**: #none

## 1. Objective
Build a reusable Python-based tool in `ψ/lab/` to analyze and eventually generate Royal Form Excel exports without immediate dependency on the main project suites.

## 2. Phase 1: Tooling & Extraction (Lab)
**Goal**: Understand the physical layout of the user's `.xls` templates.
- **Action 1.1**: Set up Python environment in `ψ/lab/royal-export/`.
- **Action 1.2**: Develop `analyze_template.py` to:
    - Load `.xls` files from `.tmp/xlsx/`.
    - Extract all column headers and their relative positions.
    - Export a "Schema Identity" for each template (e.g., Male-Black, Female-Albino).
- **Outcome**: A clear mapping of what the User *expects* to see in the final Excel.

## 3. Phase 2: Structural Alignment & Mapping (REVISED)
**Goal**: Bridge the gap between Sanity (Source) and Excel (Destination) using Age-based Categorization.
- **Action 2.1**: **Field Mapping** - Link Sanity GROQ fields to the 12 primary columns identified in Phase 1 (B=Owner, C=Farm, D-G=Address, H=Tel, I=BuffaloName, J=Microchip, K=Father, L=Mother).
- **Action 2.2**: **Categorization Logic (Method 2)** - Use `buffaloAge` (Integer months) to determine the target sheet. 
    - Define ranges: 10-12, 12-15, 15-18, 18-20, 20-22, 22-24, 24-28, 28-32, 32-36, 36-48.
    - Handle exceptions for age < 10 or > 48 months.
- **Action 2.3**: **Data Transformation** - Format Tel numbers, join address components if necessary, and ensure all character encoding (Thai) is preserved.
- **Outcome**: A "Implementation Blueprint" (Lab Script v2) ready to generate the actual file.

## 4. Why this approach?
- **Stability**: `buffaloAge` is already calculated in the registration flow, making it more reliable than string matching.
- **Isolation**: Prevents breaking the `jaothui-dashboard` build while experimenting.
- **Verifiability**: We can run the lab script and verify the output against the template manually.
- **Future Use**: The lab script can be converted into a CLI tool for the user to run locally on their raw data if needed.

---
**Oracle Status**: Plan initialized. Awaiting Phase 1 execution.
