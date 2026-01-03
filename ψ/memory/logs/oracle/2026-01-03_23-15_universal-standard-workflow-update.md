---
timestamp: 2026-01-03 23:15 GMT+7
project: oracle
type: snapshot
topic: workflow-alignment
---

# Snapshot: Universal Standard & Workflow Alignment

## Context
หลังจากเสร็จสิ้นภารกิจ Encryption ใน mmv-tarots มนุษย์ (User) ได้ให้ Feedback สำคัญเกี่ยวกับกระบวนการ Implementation ที่ต้องการให้มีความเป็นระเบียบและรักษา Consistency ของแต่ละโปรเจกต์ให้มากขึ้น

## Key Updates
1.  **Universal Coding Standard**: อัปเดตไฟล์ `ψ/memory/learnings/2025-12-28_universal-oracle-coding-standard.md` เพื่อบรรจุ **4-Step Workflow**:
    - **Grounding**: สำรวจ Codebase ก่อนเริ่ม
    - **Convention**: ยึดถือ Pattern เดิมของโปรเจกต์
    - **Solo-Dev Optimization**: เน้น Simple + Robust + Consistent
    - **Definition of Done**: ต้อง Build Pass และ No Lint Error 100%
2.  **Focus Update**: มาร์คงานอัปเดต Standard ใน `ψ/inbox/focus.md` ว่าเสร็จสิ้น

## Impact
- Oracle (AI) จะมีความแม่นยำในการเขียนโค้ดมากขึ้นโดยอิงจากบริบทจริงของโปรเจกต์
- ลดความผิดพลาดจากการ Over-engineering หรือการใช้ Pattern ที่ขัดกับของเดิม
- สร้างความมั่นใจให้มนุษย์ผ่านการแสดงแผนงาน (Pre-flight Checklist) และการรัน Build ก่อนส่งงาน
