# Snapshot: Phase 3 Implementation Plan - Dynamic Royal Export Tool
**Timestamp:** 2026-01-07 22:35 (Local)
**Project:** Shared / Oracle Lab (`ψ/lab/royal-export/`)
**Target Event ID**: `44da822e-7ec6-4e82-b530-a2ef06759f24`

## 1. Objective
Develop a production-ready CLI tool in the Lab environment that can export registration data for ANY given `eventId`. This tool will be the "Engine" before we decide to integrate it back into the main Next.js project.

## 2. Phase 3: Detailed Roadmap

### Action 3.1: The Fetcher (Sanity Connector)
- **Tool**: Python `httpx` or `requests`.
- **Logic**: Use the Sanity GROQ API to fetch all `eventRegister` documents where `event._ref` matches the input ID.
- **Join Fields**:
    - `...` (Register Info)
    - `"address": *[_type=="eventAddress" && eventRegister._ref == ^._id][0]`
    - `"approvement": *[_type=="approvment" && eventRegister._ref == ^._id][0]`

### Action 3.2: The Categorizer (Bucket Logic)
- **Category 1**: Split data into 4 major files based on `sex` and `color`.
- **Category 2**: Within each file, group data by `buffaloAge` into the 10 sheets defined in Phase 2.
- **Validation**: If age is out of bounds (<10 or >48), move to an "Extra" sheet or log a warning.

### Action 3.3: The Injector (Excel Writing)
- **Library**: `xlutils.copy` (to preserve `.xls` formatting) or convert templates to `.xlsx` for better stability.
- **Process**:
    1. Load Template.
    2. Start writing at **Row 6**.
    3. Auto-increment "Running No." (Column A).
    4. Apply Thai font settings to ensure readability.

### Action 3.4: CLI Interface
- **Command**: `venv/bin/python export_royal.py --event <id>`
- **Flags**:
    - `--dry-run`: Fetch data and print summaries/mapping to terminal without writing to Excel.
- **Output**: Generates a ZIP or a folder containing the 4 populated Excel files.

## 3. Data Safety & Reusability
- **Config Driven**: Store Sanity credentials in a local `.env` within the Lab folder (GitIgnored).
- **Template Isolation**: Keep raw templates in `.tmp/xlsx/` and output results in `ψ/lab/royal-export/output/`.

---
**Oracle Status**: Phase 3 Plan finalized. Ready to build the Dynamic Fetcher.
