---
type: learning
project: shared
topic: universal-coding-standard
status: distilled
---

# Universal Oracle Coding Standard (The Human Preference)

เอกสารนี้สรุป "โครงสร้างและสไตล์การเขียนโค้ด" ที่มนุษย์ (User) พึงพอใจ เพื่อให้ Oracle (AI) สามารถนำไปประยุกต์ใช้ได้กับทุกโปรเจค ทุกภาษา และทุกแพลตฟอร์ม โดยไม่ต้องรอให้สั่งซ้ำ

## 1. Architecture: "Service-Oriented & Type-Safe"

ไม่ว่าจะเป็นภาษาใด Oracle ควรยึดถือโครงสร้างดังนี้:
- **Functional First**: เน้นการเขียนแบบ Functional Programming มากกว่า Class-based (ใช้ Class เฉพาะเมื่อจำเป็นยิ่งยวด)
- **Separation of Concerns**: แบ่งหน้าที่ชัดเจนแต่ไม่ซับซ้อน (Simple yet Robust) โฟลเดอร์ไม่ต้องเยอะแต่ต้องสื่อสารหน้าที่ได้ชัดเจน
- **Service Layer**: แยก Business Logic ออกจาก Controller/API Route เสมอ
- **Type-Safe Validation**: ใช้ Library สำหรับ Validate ข้อมูลที่รับมาจากภายนอกเสมอ (เช่น **Zod** ใน TypeScript, **Pydantic** ใน Python)
- **API Wrapper**: มี Layer กลางสำหรับเรียก API ภายนอกหรือ Internal API เพื่อจัดการ Error และ Type ให้เป็นมาตรฐานเดียวกัน

## 2. UI & Design: "MimiVibe Glassmorphism"

สไตล์การออกแบบที่มนุษย์ชอบ (โดยเฉพาะในโปรเจคสายมูหรือ Modern Web):
- **Glassmorphism**: ใช้ความโปร่งใส (`backdrop-blur`), ขอบมน (`rounded-2xl`), และเส้นขอบบางๆ (`border-white/10`)
- **Visual Tokens**: กำหนดสี `primary`, `accent`, `success`, `warning`, `destructive` ให้ชัดเจนใน Config
- **Atomic Components**: สร้าง Component พื้นฐาน (UI) ที่ Reusable และใช้ `cva` (หรือเทียบเท่า) ในการจัดการ Variants

## 3. Coding Conventions

- **Strict Typing**: ห้ามใช้ `any` หรือ `unknown` โดยเด็ดขาด เว้นแต่จะจำเป็นยิ่งยวด (Strict Type is a MUST)
- **Simple & Secure**: โค้ดไม่ต้องหรูหราหรือซับซ้อนเกินไป เน้นความเรียบง่ายแต่แข็งแกร่งและปลอดภัย (Robust & Secure)
- **Naming**: ใช้ `kebab-case` สำหรับชื่อไฟล์ และ `camelCase` สำหรับตัวแปร/ฟังก์ชัน
- **Documentation**: เขียน JSDoc หรือ Comment อธิบาย "ทำไม (Why)" ไม่ใช่แค่ "ทำอะไร (What)"
- **Path Alias**: ใช้ Path Alias (เช่น `@/`) เพื่อหลีกเลี่ยง Relative Path ที่ซับซ้อน

## 4. Oracle Behavior (The "Integrity" Factor)

- **Helpful over Agreeable**: Oracle จะไม่พยักหน้าตามทุกอย่าง หากพบว่าแนวทางที่มนุษย์เลือกขัดกับ Best Practice หรือจะสร้าง Technical Debt ในอนาคต Oracle ต้องแจ้งเตือนและเสนอทางเลือกที่ "ถูกต้อง" กว่าเสมอ
- **Pattern Recognition**: ก่อนเริ่มงานในโปรเจคใหม่ Oracle ต้องเช็ค `ψ/memory/learnings/` เพื่อดูว่ามี Pattern เฉพาะของโปรเจคนั้นหรือไม่
- **Consistency First**: หากมีการ Refactor ต้องรักษา Pattern เดิมไว้เสมอ เว้นแต่จะได้รับคำสั่งให้เปลี่ยน
- **Proactive Suggestion**: หากพบว่าโค้ดเริ่มหลุดจาก Pattern (เช่น ลืมใช้ Service Layer) Oracle ต้องแจ้งเตือนและเสนอวิธีแก้ไข

---
**Oracle Note**: นี่คือ "คัมภีร์" ที่จะทำให้เราทำงานร่วมกันได้อย่างมีประสิทธิภาพและซื่อสัตย์ต่อความจริง Oracle จะใช้เอกสารนี้เป็นฐานรากในการสร้างสรรค์ผลงานที่ยั่งยืนต่อจากนี้
