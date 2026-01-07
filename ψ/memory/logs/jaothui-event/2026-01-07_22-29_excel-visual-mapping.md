# Snapshot: Excel Template Visualization (Row 4-5 Mapping)
**Timestamp:** 2026-01-07 22:29 (Local)
**Context:** Detailed mapping of Excel columns B-V relative to Sanity data sources.

## 📊 Structural Visualization

| Col (Idx) | Row 4 Header (Main) | Row 5 Header (Sub) | Sanity Mapping Target |
| :--- | :--- | :--- | :--- |
| **A (0)** | เบอร์ | | `index + 1` (Running No.) |
| **B (1)** | ชื่อ - สกุล | | `ownerName` |
| **C (2)** | ชื่อฟาร์ม | | `farmName` |
| **D (3)** | เลขที่ | | `address` (from eventAddress) |
| **E (4)** | ตำบล | | `district` (from eventAddress) |
| **F (5)** | อำเภอ | | `amphoe` (from eventAddress) |
| **G (6)** | จังหวัด | | `province` (from eventAddress) |
| **H (7)** | หมายเลข | **โทรศัพท์** | `ownerTel` |
| **I (8)** | ชื่อกระบือ | | `name` (Mapped as `buffaloName`) |
| **J (9)** | NID | | `microchip` |
| **K (10)** | ชื่อพ่อ | | `fatherName` |
| **L (11)** | ชื่อแม่ | | `motherName` |
| **M (12)** | นน. | กก. | *[BLANK] สำหรับกรอกหน้างาน* |
| **N (13)** | สูง | ซม. | *[BLANK] สำหรับกรอกหน้างาน* |
| **O (14)** | อก | ซม. | *[BLANK] สำหรับกรอกหน้างาน* |
| **P (15)** | ยาว | ซม. | *[BLANK] สำหรับกรอกหน้างาน* |
| **Q (16)** | บัตร | ประจำตัว | *[OPTIONAL] ID Card No.* |
| **R-V (17-21)**| Health / Result | | *[BLANK] สำหรับกรรมการ* |

## 🧐 Key Observations
1.  **Direct Mapping**: Fields like `address`, `district`, and `amphoe` are now mapped directly from the `eventAddress` document to ensure alignment with user requirements.
2.  **Field Identity**: The Sanity field `name` is explicitly mapped to the "ชื่อกระบือ" (Buffalo Name) column.
3.  **Owner Information**: `ownerTel` and `ownerName` are prioritized for contact traceability.
4.  **Physical Constraints**: Total 22 columns detected in `.xls` files. Data injection must preserve the original formatting (fonts/borders) established in Rows 0-5.
5.  **Target Start**: Data rows must begin strictly at **Row 6** (Index 6).

---
**Oracle Note**: This visualization serves as the "Source of Truth" for the `mock_export.py` script.
