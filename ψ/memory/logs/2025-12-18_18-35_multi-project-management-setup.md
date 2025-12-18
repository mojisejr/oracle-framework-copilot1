# Log: Multi-Project Management Setup

**Date**: 2025-12-18 18:35 GMT+7
**Issue**: #4
**Status**: Completed

## Decision
ตัดสินใจใช้ `ψ/` (Oracle Framework) เป็นศูนย์กลางความรู้ (Knowledge Hub) สำหรับทุกโปรเจคใน Workspace โดยแยกส่วนของ Code (Git Repos) ออกจาก Knowledge Base อย่างเด็ดขาด

## Implementation Details
1. อัปเดต `.github/copilot-instructions.md` เพิ่มส่วน **Multi-Project Management**
2. กำหนดกฎ **Git Isolation**: ห้ามรวม `ψ/` เข้าไปในโปรเจคย่อย
3. กำหนดกฎ **Project Tagging**: ใช้ Prefix ชื่อโปรเจคในไฟล์ Log/Retrospective
4. อัปเดต `ψ/inbox/focus.md` เพื่อเริ่มงานใน Issue #4

## Rationale
เพื่อให้ Oracle Framework ทำหน้าที่เป็น "สมองภายนอก" ที่แท้จริง ซึ่งสามารถสะสมความรู้ข้ามโปรเจคได้ (Cross-Project Learning) โดยไม่ทำให้ Repository ของโปรเจคจริงรกด้วยไฟล์บันทึกส่วนตัว

## Next Steps
- สร้าง Template `.gitignore` สำหรับโปรเจคย่อย
- สรุปบทเรียนลงใน `ψ/memory/learnings/`
