# Snapshot: Parallelism Micro-Update Plan (Multi-Repo Precision)

**Time**: 2026-01-11 21:48 GMT+7
**Context**: สถาปัตยกรรม Oracle v2.3 กำลังถูกปรับจูนเพื่อรองรับโครงสร้างโปรเจกต์แบบ Multi-repo หลังจากพบว่า Standard Delegation Tool มีข้อจำกัดในการระบุ Target Repository ในโฟลเดอร์ `projects/`.

## แผนการอัปเดต (Micro-Update Plan)

### 1. Refinement of [.claude/commands/impl.md](.claude/commands/impl.md)
*   **เป้าหมาย**: เพิ่มตรรกะการตัดสินใจใน "Phase 0: Orchestration"
*   **การเปลี่ยนแปลง**:
    *   ถ้าภารกิจอยู่ใน **Root Framework** (opilot) -> ใช้ `github-pull-request_copilot-coding-agent` (Standard Warp)
    *   ถ้าภารกิจอยู่ใน **Sub-Project** (projects/*) -> ต้องใช้ **Issue-Based Delegation** (Create Issue -> Assign Copilot) เพื่อบังคับให้ Agent ทำงานถูก Repository

### 2. Refinement of [.claude/agents/oracle-keeper.md](.claude/agents/oracle-keeper.md)
*   **เป้าหมาย**: เพิ่มทักษะ "Cross-Repo Conductor" 
*   **การเปลี่ยนแปลง**:
    *   ระบุหน้าที่ในการสำรวจ `remote -v` ของ Sub-Project ก่อนทำการวาร์ป
    *   เพิ่มคำแนะนำให้ใช้เครื่องมือจัดการ Issue ใน Repository ปลายทางเพื่อรักษาสภาพแวดล้อม (Isolation) และความแม่นยำ (Precision)

### 3. Logic: The "Precision Warp" Workflow
1. **Identify**: ระบุพิกัด Repo ของ Sub-project (เช่น `mojisejr/mmv-tarots`)
2. **Issue**: เปิด GitHub Issue ใน Repo นั้นพร้อมติดแท็กภารกิจ
3. **Assign**: ใช้คำสั่งมอบหมายงานให้ Copilot ใน Issue นั้นโดยตรง
4. **Link**: นำ PR/Issue Link มาบันทึกใน `focus.md` ตามปกติ

## Apply When
- เมื่อมีการมอบหมายงาน (Delegating) ให้กับโปรเจกต์ย่อยที่แยก Repository ออกไปจาก Oracle Root.

## Tags
`micro-update` `multi-repo` `parallelism-v2.3` `conductor-precision`
