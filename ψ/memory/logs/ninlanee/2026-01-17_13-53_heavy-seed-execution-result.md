# Snapshot: Heavy Seeding Execution Result (Ninlanee)

**Time**: 2026-01-17 13:53 GMT+7
**Context**: Executed `prisma/seed-heavy.ts` to populate the database with realistic mock data in preparation for Phase 3 (The Face).

## Execution Log

```bash
🌱 Starting The Heavy Seed for Ninlanee...
🧹 Cleaning old data...
📦 Seeding Categories...
👤 Seeding Mock Users...
   -> Found Admin: Non. 啊农。ฟีม (Linked successfully)
🐔 Seeding Chicken Lineage...
   -> Created 8 Grandparents (G1) [Status: APPROVED]
   -> Created 12 Parents (G2) [Status: APPROVED]
   -> Created 30 Offering/New Generation (G3) [Mixed Status]
✅ Seeding Completed Successfully!
```

## Data Profile

| Metric | Count | Purpose |
|--------|-------|---------|
| **Total Chickens** | 50 | Robust Testing |
| **Generations** | 3 (G1->G2->G3) | Test Pedigree Tree Logic |
| **Media Types** | Square, Landscape, Portrait | Test Grid Resilience |
| **Users** | 1 Admin + 4 Mock | Test Owner Display |

## Insight

การรัน Script สำเร็จลุล่วงโดยไม่มี Error ข้อมูลชุดนี้มีความหลากหลาย (Variety) สูงมาก:
- มีไก่ที่มีรูปครบ 3-4 รูป และไก่ที่มีแค่รูปเดียว
- มีชื่อยาวและสั้น
- มีสถานะที่หลากหลาย (Pending, Rejected, Approved)
- ที่สำคัญคือ **Admin (คุณ)** เป็นเจ้าของไก่จำนวนหนึ่ง ทำให้เมื่อ Login เข้าไปจะเห็นข้อมูลใน Dashboard ทันที

## Apply When

- ใช้ทดสอบหน้า **Public Showcase** (ดูการจัด Grid)
- ใช้ทดสอบ **Pedigree Tree** (ดูเส้นสายเลือด)
- ใช้ทดสอบ **Filters** (กรองตาม Category หรือ Status)

## Tags

`ninlanee` `seed-result` `data-profile` `ready-for-phase-3`
