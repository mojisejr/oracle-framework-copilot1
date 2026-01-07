# Implementation Blueprint: Royal Form Export v1
**Timestamp:** 2026-01-07 22:25 (Local)
**Phase 2**: Structural Alignment & Mapping

## 1. Data Source (Sanity GROQ Mapping)
The export will use the following data mapping from Sanity to Excel columns:

| Excel Col | Target Field (Sanity Path) | Logic / Transformation |
| :--- | :--- | :--- |
| **0 (A)** | `(index + 1)` | Running number per sheet |
| **1 (B)** | `eventRegister.ownerName` | |
| **2 (C)** | `eventRegister.farmName` | |
| **3 (D)** | `eventAddress.address` | |
| **4 (E)** | `eventAddress.district` | |
| **5 (F)** | `eventAddress.amphoe` | |
| **6 (G)** | `eventAddress.province` | |
| **7 (H)** | `eventRegister.ownerTel` | |
| **8 (I)** | `eventRegister.name` | Buffalo name |
| **9 (J)** | `eventRegister.microchip` | Microchip / NID |
| **10 (K)** | `eventRegister.fatherName` | |
| **11 (L)** | `eventRegister.motherName` | |
| **16 (Q)** | `user.idCard` | Optional (depending on privacy settings) |

## 2. Dynamic Sheet Selection (Age Logic)
Total 10 sheets available in each template. Logic based on `buffaloAge` (months):

| Age Range (Months) | Target Sheet Name |
| :--- | :--- |
| `10 <= age < 12` | `>10-<12 เดือน` |
| `12 <= age < 15` | `>12-<15 เดือน ` |
| `15 <= age < 18` | `>15-<18 เดือน` |
| `18 <= age < 20` | `>18-<20 เดือน` |
| `20 <= age < 22` | `>20-<22 เดือน` |
| `22 <= age < 24` | `>22-<24 เดือน` |
| `24 <= age < 28` | `>24-<28 เดือน ` |
| `28 <= age < 32` | `>28-<32 เดือน` |
| `32 <= age < 36` | `>32-<36 เดือน` |
| `36 <= age <= 48` | `โตเต็มวัย 36-48 เดือน` |

## 3. Template File Selection
Based on registration metadata:
- **Sex: Male + Color: Black** -> `กระบือดำเพศผู้.xls`
- **Sex: Female + Color: Black** -> `กระบือดำเพศเมีย.xls`
- **Sex: Male + Color: Albino** -> `กระบือเผือกเพศผู้.xls`
- **Sex: Female + Color: Albino** -> `กระบือเผือกเพศเมีย.xls`

## 4. Technical Implementation Notes
- **Library**: Since the templates are `.xls` (Legacy format), we will use `xlrd` for reading and `xlutils` or `xlwt` for writing. However, for a modern Node.js integration later, we should consider converting these to `.xlsx` using a script.
- **Data Fallback**: If `buffaloAge` is missing or out of range, the record will be logged but not exported to the main sheets to prevent layout corruption.

---
**Oracle Status**: Phase 2 Blueprint Completed. Ready for Lab Script implementation.
