# Snapshot: Plumbling (Water Bill System)

**Time**: 2026-01-11 23:05
**Context**: Initial analysis of `projects/plumbling`

## Insight

**Project Purpose**: A CLI tool written in **Rust** to generate water bill receipts (PDF) from CSV data for a village water system.

**Tech Stack**:
- Language: Rust (`cargo`)
- Key Crates: `printpdf` (PDF gen), `csv` (parsing), `serde`

**Workflow**:
1.  **Input**: Reads CSV from `input-csv/` (Example: `bills_nov_68.csv`).
2.  **Process**: Parses Thai columns (`ลำดับ`, `เลขมิเตอร์`, `ชื่อ`, etc.).
3.  **Output**: Generates a PDF receipt file in `bills/` (Example: `plumbing_nov_68.pdf`).

**Usage**:
- Run: `cargo run --release`
- Config: Currently relies on hardcoded paths in `src/main.rs` (lines 17-19).

## Apply When

Use this tool when issuing monthly water bills.
Next steps should involve making the input/output paths configurable via CLI arguments to avoid editing `main.rs` every month.

## Tags

`rust` `pdf` `automation` `village-tools`
