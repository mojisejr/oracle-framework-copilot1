---
title: Git isolation for oracle
date: 2025-12-19
project: oracle-framework
tags: git-isolation, architecture, writing
sources:
  - [ψ/memory/learnings/2025-12-18_git-isolation-and-phase-development.md](ψ/memory/learnings/2025-12-18_git-isolation-and-phase-development.md)
  - [ψ/memory/logs/2025-12-18_19-30_dosage-converter-init.md](ψ/memory/logs/2025-12-18_19-30_dosage-converter-init.md)
---

# Git isolation for oracle

## Intro
เป้าหมายของบทความนี้คือการตั้งค่าให้ `ψ/` ทำหน้าที่เป็นศูนย์กลางความรู้ (external brain) — เก็บบันทึก การทดลอง และเหตุผลการตัดสินใจ — แต่ไม่ถูกผนวกเป็นส่วนหนึ่งของประวัติการพัฒนาใน repo ของโปรเจกต์ บทความนี้จะแสดงแนวทางปฏิบัติ (Git Isolation) ที่ช่วยให้ประวัติการทำงานสะอาด ติดตามได้ และปลอดภัย

## Why isolation matters
- **Traceability**: สามารถย้อนกลับไปดูเหตุผลเบื้องหลังการตัดสินใจได้จาก `ψ/` โดยไม่รบกวนประวัติการ commit ของโค้ด
- **Clean History**: ประวัติการ commit ของโปรเจกต์ย่อยจะมีเฉพาะเรื่องโค้ดและการแก้ปัญหาทางเทคนิค
- **Archive Policy**: สอดคล้องกับหลักการ "Nothing is Deleted" โดยการเก็บประวัติการทดลองไว้ใน `ψ/lab/` แทนการลบทิ้ง

- **Risks:**
  - เผลอ commit บันทึกหรือร่างจาก `ψ/` เข้าไปใน repo → ประวัติการ commit ปนกัน
  - ข้อมูลภายใน/ร่างหลุดออกสู่ public โดยไม่ตั้งใจ
  - ยากต่อการ revert/แยกประวัติเมื่อจำเป็นต้องคืนค่าหรือย้ายโค้ด

- **Mitigations:**
  - บังคับ `ψ/` ใน root `.gitignore` และใช้ `templates/sub-project.gitignore`
  - ติดตั้ง `pre-commit` hook template เพื่อเตือนหรือบลอคการเปลี่ยนแปลงที่ชี้ไปยัง `ψ/`
  - เพิ่มการตรวจสอบใน CI (PR check) ว่าไม่มีไฟล์จาก `ψ/` ปรากฏใน diff
  - ใช้สคริปต์ sync/publish ที่เป็นทางการเมื่อต้องการนำเนื้อหาบางส่วนจาก `ψ/` ไปยังโปรเจกต์

## Principles
1.  **Root Isolation**: ไฟล์ `.gitignore` ที่ root ของ Oracle Framework ต้อง ignore โฟลเดอร์ `projects/`
2.  **Independent Repositories**: แต่ละโปรเจกต์ใน `projects/` ต้องมี `.git` ของตัวเอง
3.  **Knowledge vs. Code**: `ψ/` เก็บ *ทำไม* (why) ส่วนโปรเจกต์เก็บ *อย่างไร* (how)

## Step-by-step How-to

### 1. เตรียม .gitignore Template
ใช้ [templates/sub-project.gitignore](templates/sub-project.gitignore) เพื่อให้แน่ใจว่าโปรเจกต์ย่อยจะไม่เผลอ commit โฟลเดอร์ `ψ/` เข้าไป

### 2. สร้าง Repository แยก
```bash
cd projects
mkdir my-new-project
cd my-new-project
git init
# คัดลอก .gitignore จาก template
cp ../../templates/sub-project.gitignore .gitignore
git add .
git commit -m "chore: initial commit with oracle isolation"
```

### 3. การเชื่อมโยง Issue
ทุกครั้งที่ commit ในโปรเจกต์ย่อย ให้ระบุหมายเลข Issue (ถ้ามี) เพื่อให้เชื่อมโยงกลับมายังบันทึกใน Oracle Framework ได้
```bash
git commit -m "feat: implement core logic (#5)"
```

## Example: Dosage Converter
อ้างอิงจาก [ψ/memory/logs/2025-12-18_19-30_dosage-converter-init.md](ψ/memory/logs/2025-12-18_19-30_dosage-converter-init.md) เราได้แยกโปรเจกต์ `dosage-converter` ออกมาอย่างชัดเจน ทำให้การพัฒนาในแต่ละ Phase (Logic → UI → Assembly) เป็นไปอย่างเป็นระบบ

## Publish & Archive
เมื่อบทความนี้เสร็จสมบูรณ์ ร่างสุดท้ายจะถูกเก็บไว้ใน `ψ/writing/` และอัปเดตสถานะใน `ψ/memory/logs/` เพื่อเป็นหลักฐานการเรียนรู้

## Checklist
- [ ] `ψ/` ถูก ignore ในโปรเจกต์ย่อยแล้ว
- [ ] มีการสร้าง repo แยกสำหรับโปรเจกต์ย่อย
- [ ] ใช้ Issue ID ในการ commit
- [ ] บันทึกการตัดสินใจลงใน `ψ/memory/logs/`
