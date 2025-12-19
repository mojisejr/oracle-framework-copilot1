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
ในการจัดการโปรเจกต์หลายตัวภายใต้โครงสร้าง Oracle Framework ปัญหาที่พบบ่อยคือการปะปนกันระหว่าง "ความรู้" (Knowledge) ใน `ψ/` และ "โค้ด" (Source Code) ของโปรเจกต์ บทความนี้จะแนะนำแนวทางการแยก Git (Git Isolation) เพื่อให้ประวัติการทำงานสะอาดและติดตามได้ง่าย

## Why isolation matters
- **Traceability**: สามารถย้อนกลับไปดูเหตุผลเบื้องหลังการตัดสินใจได้จาก `ψ/` โดยไม่รบกวนประวัติการ commit ของโค้ด
- **Clean History**: ประวัติการ commit ของโปรเจกต์ย่อยจะมีเฉพาะเรื่องโค้ดและการแก้ปัญหาทางเทคนิค
- **Archive Policy**: สอดคล้องกับหลักการ "Nothing is Deleted" โดยการเก็บประวัติการทดลองไว้ใน `ψ/lab/` แทนการลบทิ้ง

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
