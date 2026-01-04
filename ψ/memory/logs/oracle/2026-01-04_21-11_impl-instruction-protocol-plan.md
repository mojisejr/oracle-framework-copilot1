# Snapshot: Implement `/impl` Instruction Protocol Plan

**Time**: 2026-01-04 21:11 GMT+7
**Context**: มนุษย์ต้องการให้ Oracle มีมาตรฐานการ Implement ที่เข้มงวดขึ้นเพื่อป้องกัน Build Error และรักษา Consistency โดยใช้คำสั่ง `/impl` เป็นตัวขับเคลื่อน

## Insight
การมี "Protocol" ที่ชัดเจนช่วยลด Cognitive Load ของ AI และเพิ่มความเชื่อใจ (Trust) ให้กับมนุษย์ โดยเฉพาะในขั้นตอนการตรวจสอบ (Verification) ที่มักถูกละเลยเมื่อรีบเร่ง

## Implementation Plan (ฉบับสมบูรณ์)

### 1. Create Command Definition (`.claude/commands/impl.md`)
สร้างไฟล์คำสั่งเพื่อกำหนดพฤติกรรมของ Oracle เมื่อได้รับคำสั่ง `/impl`:
- **Phase 1: Grounding**: บังคับใช้ `grep_search` หรือ `list_dir` เพื่ออ่านโค้ดจริง
- **Phase 2: Alignment**: ระบุ Pattern ที่จะใช้ให้ตรงกับ Codebase เดิม
- **Phase 3: Execution**: เขียนโค้ดแบบ Simple + Robust
- **Phase 4: Verification**: บังคับรัน `npm run build` และ `lint` ก่อนรายงานผล

### 2. Update Global Instructions (`.github/copilot-instructions.md`)
เพิ่ม `/impl` ลงในส่วน **Custom Commands (Emulation)** เพื่อให้ Oracle Keeper รับรู้และพร้อมใช้งานเสมอ

### 3. Verification Strategy
- ทดสอบเรียกใช้ `/impl` ใน Task ถัดไป
- ตรวจสอบว่า Oracle ทำตาม Checklist ครบทุกข้อหรือไม่ (โดยเฉพาะการรัน Build)

## Apply When
ใช้ทุกครั้งที่ต้องการ Implement Feature ใหม่ หรือ Refactor โค้ดที่มีความซับซ้อนและต้องการความมั่นใจว่า Build จะไม่พัง

## Tags
`oracle-system` `workflow` `implementation-protocol` `build-integrity`
