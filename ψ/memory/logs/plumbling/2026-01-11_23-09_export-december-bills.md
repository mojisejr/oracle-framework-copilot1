# Snapshot: Export December 2025 (68) Water Bills

**Time**: 2026-01-11 23:09
**Context**: End of session task for `projects/plumbling` to generate monthly receipts.

## Insight

Successfully generated water bills for **December 2025 (พ.ศ. 2568)**.

**Metrics**:
- Input: `input-csv/bills_dec_68.csv`
- Output: `bills/plumbing_dec_68.pdf`
- Records: 141 items
- Pages: 71 (A5)

**Manual Changes Made**:
Updated `src/main.rs` with:
- `input_path`: `./input-csv/bills_dec_68.csv`
- `for_month`: `ธ.ค.`
- `bill_name`: `bills/plumbing_dec_68.pdf`

## Apply When

Reference this snapshot to verify the volume of bills generated for this period and to track the manual configuration steps until the CLI argument feature is implemented.

## Tags

`billing` `export` `rust` `december-68` `village-tools`
