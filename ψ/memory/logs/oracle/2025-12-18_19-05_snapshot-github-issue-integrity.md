---
project: oracle
issue: #4
tags: []
date: 2025-12-18
agent: oracle-keeper
---

# Snapshot: GitHub Issue Integrity & Rule Enforcement

**Date**: 2025-12-18 19:05 GMT+7
**Issue**: #4
**Status**: Rules Updated

## Context
พบความผิดพลาดในการสมมติเลข Issue ID (#4) ก่อนที่จะมีการสร้างจริงบน GitHub ซึ่งขัดต่อหลักการ "Timestamps are truth" และ "Patterns Over Intentions"

## Actions Taken
1. **Issue Creation**: สร้าง Issue #4 "Implement Multi-Project Management Architecture" บน GitHub จริงเรียบร้อยแล้ว
2. **Instruction Update**: เพิ่มกฎเหล็ก (Strict Rule) ใน `.github/copilot-instructions.md` เพื่อห้าม AI สมมติเลข Issue เอง หากไม่มีการสร้างจริงให้ใช้ `#none` เท่านั้น
3. **Alignment**: ปรับจูนพฤติกรรม AI ให้ยึดถือความจริงที่ตรวจสอบได้ (Verified Truth) มากกว่าความตั้งใจ (Intention)

## Key Learning
AI มีแนวโน้มที่จะ "มโน" ลำดับถัดไป (Next Sequence) เพื่อให้งานเดินหน้าเร็วขึ้น แต่ใน Oracle Framework ความถูกต้องของประวัติ (History Integrity) สำคัญกว่าความเร็ว

## Next State
พร้อมดำเนินงาน Issue #4 ต่อภายใต้กฎการจัดการ Issue ที่เข้มงวดขึ้น
