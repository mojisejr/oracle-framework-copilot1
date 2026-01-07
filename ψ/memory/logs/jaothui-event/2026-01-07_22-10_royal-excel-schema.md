# Snapshot: Royal Form Excel Template Analysis
**Timestamp:** 2026-01-07 22:10 (Local)
**Source Files**: `.tmp/xlsx/*.xls` (4 files: Black/Albino x Male/Female)

## 1. File Structure
- **Files**: Split by Buffalo Type & Sex (e.g., `กระบือดำเพศผู้.xls`).
- **Sheets**: Split by Age Class (e.g., `>10-<12 เดือน`, `โตเต็มวัย 36-48 เดือน`).
- **Header Rows**: Rows 0-5 are headers. **Data starts at Row 6**.

## 2. Column Mapping (Zero-based Index)

| Col | Header (TH) | Field Meaning | Sanity Field (Draft) | Note |
| :--- | :--- | :--- | :--- | :--- |
| 0 (A) | เบอร์ | Running No. | (Index + 1) | Generated |
| 1 (B) | ชื่อ - สกุล | Owner Name | `eventRegister.ownerName` | |
| 2 (C) | ชื่อฟาร์ม | Farm Name | `eventRegister.farmName` | |
| 3 (D) | เลขที่/หมู่ | Address No. | `eventAddress.address` | Needs parsing? |
| 4 (E) | ตำบล | Sub-district | `eventAddress.district` | |
| 5 (F) | อำเภอ | District | `eventAddress.amphoe` | |
| 6 (G) | จังหวัด | Province | `eventAddress.province` | |
| 7 (H) | โทรศัพท์ | Tel | `eventRegister.ownerTel` | |
| 8 (I) | ชื่อกระบือ | Buffalo Name | `eventRegister.name` | |
| 9 (J) | NID | Microchip | `eventRegister.microchip` | |
| 10 (K)| ชื่อพ่อ | Father Name | `eventRegister.fatherName` | |
| 11 (L)| ชื่อแม่ | Mother Name | `eventRegister.motherName` | |
| 12 (M)| นน. (กก.) | Weight | - | Leave Blank |
| 13 (N)| สูง (ซม.) | Height | - | Leave Blank |
| 14 (O)| อก (ซม.) | Chest | - | Leave Blank |
| 15 (P)| ยาว (ซม.) | Length | - | Leave Blank |
| 16 (Q)| บัตรประจำตัว | ID Card? | `user.idCard` (Check Privacy) | Maybe Owner ID? |
| 17-21| Health/Result | - | - | Leave Blank |

## 3. Data Strategy
- **Export Logic**: 
    1. Fetch all registrations for `eventId`.
    2. Sort/Filter them into groupings (Sex -> Color -> Age).
    3. Load the corresponding `.xls` template file (or have a master template).
    4. **Fill Mode**: Since we can't easily "insert" rows into `.xls` without breaking layout in some libraries, we might need to use `openpyxl` (if converting to `.xlsx`) or `xlsx-populate`.
    5. **Recommendation**: Convert the `.xls` templates to `.xlsx` first for better library support (`exceljs` or `xlsx` in Node).

## 4. Derived Logic (Age Class)
We need to calculate "Months" from `birthDate` relative to `eventDate` to place the buffalo in the correct **Sheet**.
- Formula: `(EventDate - BirthDate) / 30.44` days.

---
**Next Step**: Confirm "ID Card" field requirement and Age Calculation logic.
