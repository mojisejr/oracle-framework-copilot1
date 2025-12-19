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
ที่นี่เรามอง `ψ/` เป็นศูนย์กลางความรู้ของคุณ—ที่เก็บบันทึก การทดลอง และเหตุผลเบื้องหลังการตัดสินใจ—แต่ไม่ควรถูกผนวกเข้าเป็นส่วนหนึ่งของประวัติการพัฒนาใน repo ของโปรเจกต์เลย บทความนี้จะแบ่งปันแนวทาง Git Isolation ที่ทำให้เรายังคงเก็บประวัติให้สะอาด เห็นภาพเหตุการณ์ที่เกิดขึ้นง่าย และไม่พลาดข้อมูลสำคัญเวลาเจอปัญหาใหม่ๆ

## Why isolation matters
- **Traceability**: พอแยกของเก็บความรู้ไว้ใน `ψ/` เราก็สามารถย้อนดูประเด็นเดิมๆ ได้โดยไม่ทำให้ประวัติการ commit ของโค้ดยาวเฟื้อยด้วยบันทึกอื่นๆ
- **Clean History**: commit ของโปรเจกต์ย่อยจะสะท้อนแต่การเปลี่ยนแปลงโค้ดจริงๆ ไม่โดนบันทึกเบื้องหลังปน
- **Archive Policy**: ตามหลัก ``Nothing is Deleted`` เราหยุดลบทิ้งการทดลอง และเก็บมันไว้ใน `ψ/lab/` แทนการจงใจปนประวัติในโค้ด

- **Risks (ถ้าไม่แยก)**:
  - เผลอ commit บันทึกหรือร่างจาก `ψ/` เข้าไปใน repo → ประวัติการ commit ปนกันและยากจะ clean-up
  - เนื้อหาส่วนตัวหรือทดลองหลุดออกสู่ public โดยไม่ตั้งใจ เมื่อร่างยังไม่พร้อม
  - ยากต่อการ revert/แยกประวัติเมื่อจำเป็นต้องคืนค่าหรือย้ายโค้ดภายหลัง

- **Mitigations (แนวทางป้องกัน)**:
  - ใส่ `ψ/` ไว้ใน root `.gitignore` ควบคู่กับ `templates/sub-project.gitignore` เพื่อป้องกัน accidental add
  - ติดตั้ง `pre-commit` hook template ที่เตือนหรือบลอคการเปลี่ยนแปลงที่ชี้กลับไปยัง `ψ/`
  - เพิ่มการตรวจสอบใน CI/PR ว่า diff ไม่มีไฟล์จาก `ψ/`
  - ใช้สคริปต์ sync/publish อย่างเป็นทางการเมื่อจำเป็นต้องนำเนื้อหาจริงๆ จาก `ψ/` ไปไว้ในโปรเจกต์

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
