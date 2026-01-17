---
type: learning
project: shared
topic: universal-coding-standard
status: distilled
last_updated: 2026-01-17
---

# Universal Oracle Coding Standard (The Human Preference)

เอกสารนี้สรุป "โครงสร้างและสไตล์การเขียนโค้ด" ที่มนุษย์ (User) พึงพอใจ เพื่อให้ Oracle (AI) สามารถนำไปประยุกต์ใช้ได้กับทุกโปรเจค ทุกภาษา และทุกแพลตฟอร์ม โดยไม่ต้องรอให้สั่งซ้ำ

## 1. Oracle Implementation Protocol (The 4-Step Workflow)

ก่อนเริ่มเขียนโค้ดทุกครั้ง Oracle ต้องปฏิบัติตามขั้นตอนต่อไปนี้อย่างเคร่งครัด:

1.  **Grounding & Planning (Check Codebase)**
    - **Action**: ใช้ `grep_search` หรือ `list_dir` สำรวจโครงสร้างและ "กลิ่นอาย" ของโค้ดปัจจุบัน
    - **Goal**: เข้าใจบริบทก่อนเริ่มงาน ไม่มโนเอาเอง
    - **Output**: สรุปแผนงานสั้นๆ ให้ User คอนเฟิร์ม (แก้ไฟล์ไหน, กระทบอะไร)

2.  **Convention Alignment (Check Patterns)**
    - **Action**: ตรวจสอบ Code Convention, Folder Structure, และ Design Pattern ของโปรเจคนั้นๆ
    - **Goal**: เขียนโค้ดใหม่ให้ "เนียน" ไปกับโค้ดเดิม (Consistency is King)
    - **Output**: ระบุ Pattern ที่จะใช้ (เช่น "ใช้ Service Layer แบบไฟล์เดิม", "ใช้ Zod Validate")

3.  **Solo-Dev Optimization (Simple + Robust)**
    - **Style**: เขียนโค้ดให้ **Simple** (อ่านง่าย) + **Robust** (พังยาก) + **Consistent** (เหมือนเดิม)
    - **Mindset**: ไม่ต้องโชว์เทพ (Over-engineering) ถ้าไม่จำเป็น เน้นให้ Solo Dev ดูแลรักษาง่ายในระยะยาว
    - **Rule**: ถ้ามีวิธีที่ง่ายกว่าและได้ผลลัพธ์เท่ากัน ให้เลือกวิธีที่ง่ายกว่าเสมอ

4.  **Definition of Done (Verify)**
    - **Action**: หลังเขียนโค้ดเสร็จ ต้องรัน Build และ Check Linter เสมอ
    - **Goal**: ส่งมอบงานที่ "ใช้ได้จริง" ไม่ใช่แค่ "ดูเหมือนจะใช้ได้"
    - **Requirement**: **100% Build Pass, No Linter Error** (ถ้ามี Error ต้องแก้ให้จบก่อนส่งงาน)

## 2. Oracle Zoning: "HQ vs Site" Protocol

เพื่อป้องกันการเกิด Hallucination เรื่องตำแหน่งที่ตั้ง (Folder Blindness) Oracle ต้องแยกแยะพื้นที่ทำงานอย่างชัดเจนตามกฎ **"Warp & Ground"**:

- **The Headquarters (HQ)**: พื้นที่ Root และ `ψ/` (Administrative Zone)
    - **Rule**: ห้าม Run คำสั่ง Build/Install/Production-Runtime ของโปรเจคย่อยที่นี่
- **The Project Sites (Site)**: พื้นที่ `projects/<name>/` (Operational Zone)
    - **Rule (Grounding Ritual)**: เมื่อเริ่มงานใน Site ต้องใช้ Tool ยืนยันพิกัดเสมอ (เช่น `list_dir` หรืออ่าน `package.json` ของโฟลเดอร์นั้น)
    - **Rule (Terminal)**: ทุกคำสั่งใน Terminal ที่เกี่ยวกับ Site **ต้อง** ขึ้นต้นด้วย `cd projects/<name> && ...` เสมอ เพื่อป้องกัน Hallucination ใน Terminal Session

## 3. Architecture: "Service-Oriented & Type-Safe"

ไม่ว่าจะเป็นภาษาใด Oracle ควรยึดถือโครงสร้างดังนี้:
- **Functional First**: เน้นการเขียนแบบ Functional Programming มากกว่า Class-based
- **Separation of Concerns**: แบ่งหน้าที่ชัดเจนแต่ไม่ซับซ้อน (Simple yet Robust)
- **Service Layer**: แยก Business Logic ออกจาก Controller/API Route เสมอ
- **Type-Safe Validation**: ใช้ Library สำหรับ Validate ข้อมูลที่รับมาจากภายนอกเสมอ (เช่น **Zod**, **Pydantic**)
- **API Wrapper**: มี Layer กลางสำหรับเรียก API เพื่อจัดการ Error และ Type ให้เป็นมาตรฐาน

## 4. UI & Design: "MimiVibe Glassmorphism"

สไตล์การออกแบบที่มนุษย์ชอบ (โดยเฉพาะในโปรเจคสายมูหรือ Modern Web):
- **Glassmorphism**: ใช้ความโปร่งใส (`backdrop-blur`), ขอบมน (`rounded-2xl`), และเส้นขอบบางๆ (`border-white/10`)
- **Visual Tokens**: กำหนดสี `primary`, `accent`, `success`, `warning`, `destructive` ให้ชัดเจน
- **Atomic Components**: สร้าง Component พื้นฐานที่ Reusable และใช้ `cva` จัดการ Variants

## 5. Coding Conventions

- **Strict Typing**: ห้ามใช้ `any` หรือ `unknown` โดยเด็ดขาด (Strict Type is a MUST)
- **Naming**: ใช้ `kebab-case` สำหรับชื่อไฟล์ และ `camelCase` สำหรับตัวแปร/ฟังก์ชัน
- **Documentation**: เขียน JSDoc หรือ Comment อธิบาย "ทำไม (Why)" ไม่ใช่แค่ "ทำอะไร (What)"
- **Path Alias**: ใช้ Path Alias (เช่น `@/`) เพื่อหลีกเลี่ยง Relative Path ที่ซับซ้อน

## 6. Oracle Behavior (The "Integrity" Factor)

- **Helpful over Agreeable**: หาก User เลือกทางที่สร้าง Technical Debt ต้องแจ้งเตือนและเสนอทางเลือกที่ถูกต้อง
- **Pattern Recognition**: เช็ค `ψ/memory/learnings/` ก่อนเริ่มงานเสมอ
- **Consistency First**: รักษา Pattern เดิมไว้เสมอ เว้นแต่จะได้รับคำสั่งให้เปลี่ยน

---
**Oracle Note**: นี่คือ "คัมภีร์" ที่จะทำให้เราทำงานร่วมกันได้อย่างมีประสิทธิภาพและซื่อสัตย์ต่อความจริง Oracle จะใช้เอกสารนี้เป็นฐานรากในการสร้างสรรค์ผลงานที่ยั่งยืนต่อจากนี้
