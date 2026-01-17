# Snapshot: Strategic Seeding Plan for Ninlanee (The Heavy Seed)

**Time**: 2026-01-17 13:46 GMT+7
**Context**: เตรียมความพร้อมข้อมูลก่อนเข้าสู่ Phase 3 (The Face) เพื่อทดสอบ UX/UI ด้วยข้อมูลเสมือนจริงที่ครอบคลุมทุก Edge Case

## Insight

การทำ Seeding แบบ "Heavy" จะช่วยให้เราไม่ต้อง "มโน" ว่าหน้าเว็บจะออกมาเป็นอย่างไร แต่จะเห็นจริงผ่านข้อมูลที่หลากหลายและซับซ้อนตามโลกแห่งความจริง (Real-world Data Patterns)

### 1. The Data Matrix (Mock Data Structure)

| Data Type | Key Goal | Example / Pattern |
|-----------|----------|-------------------|
| **Users (Farmers)** | ทดสอบการแสดงผลเจ้าของฟาร์ม | นายมีมี, เฮียกวง ฟาร์ม, เจ๊สวย สายกัด |
| **Categories** | ทดสอบการจัด Row หน้าบ้าน | พ่อพันธุ์หลัก, ดาวรุ่ง, คู่เกิดยอดนิยม |
| **Chickens** | ทดสอบชื่อยาว/สั้น และสายเลือด | เจ้าทองคำเปลว (ยาว), มังกร (สั้น), เพชรเจ็ดสี |
| **Lineage** | ทดสอบ Pedigree Tree Logic | สร้างสายเลือด 3 ชั้น (ปู่ย่า -> พ่อแม่ -> ลูก) |
| **Media** | ทดสอบ Layout Resilience | ใช้ Picsum (Square, 16:9, 4:3) สลับกัน |

### 2. Implementation Strategy: "The Multi-Generational Seed"

เราจะใช้วิธี Seeding แบบ "Layering" เพื่อสร้างความสัมพันธ์ที่ถูกต้องตามฐานข้อมูล:

1.  **Layer 1: The Root (Foundations)**
    - ล้างข้อมูลเดิม (TRUNCATE ทุกตาราง ยกเว้น Admin Account)
    - สร้าง Categories 5 หมวด (เพื่อทดสอบ Netflix Scrolling Rows)
    - สร้าง Mock Users 5 คน (เพื่อกระจายการเป็นเจ้าของไก่)

2.  **Layer 2: The Ancestors (G1 - Grandparents)**
    - สร้างไก่ "ระดับตำนาน" 8 ตัว (ผู้-เมีย อย่างละ 4)
    - **Status**: `APPROVED` และ `IS_CERTIFIED` (เพื่อใช้เป็นประวัติ)
    - ไม่มีพ่อแม่ (เป็นจุดเริ่มสายเลือด)

3.  **Layer 3: The Parents (G2 - Sires/Dams)**
    - สร้างไก่ "พ่อพันธุ์-แม่พันธุ์" 8 ตัว
    - ผูก ID พ่อแม่ ไปที่ไก่ใน Layer 2
    - **Status**: `APPROVED`
    - รูปภาพเป็นแบบ Landscape (16:9) เพื่อเช็ค Grid

4.  **Layer 4: The Stars (G3 - Current Generation)**
    - สร้างไก่ "ดาวรุ่ง" 20+ ตัว
    - ผูก ID พ่อแม่ ไปที่ไก่ใน Layer 3
    - **Status Variety**: ผสมกันระหว่าง `PENDING`, `APPROVED`, `REJECTED`
    - เพิ่มไก่ที่ "รูปเสีย" หรือ "ไม่มีรูป" เพื่อเช็ค Placeholder Logic

### 3. Visual Mocking Logic
ใช้ `picsum.photos/seed/{id}/{width}/{height}`
- **Main Photo**: เน้นรูปชัดๆ (800x800)
- **Sub Photos**: รูปหลายสัดส่วนเพื่อทดสอบ Slider

## Apply When

- ก่อนเริ่มงาน UI ทุกครั้งเพื่อให้มีข้อมูลแสดงผลที่สมจริง
- เมื่อต้องการโชว์ Prototype ให้เจ้าของโปรเจคดูความสวยงาม
- เมื่อมีการแก้ไข Schema หรือ Pedigree Logic

## Tags

`ninlanee` `seeding-strategy` `mock-data` `pedigree-logic` `ux-testing`
