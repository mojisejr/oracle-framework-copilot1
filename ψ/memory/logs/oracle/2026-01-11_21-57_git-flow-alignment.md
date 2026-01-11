# Snapshot: Git Flow Alignment (Staging-First Strategy)

**Time**: 2026-01-11 21:57 GMT+7
**Context**: ปรับแต่ง Oracle Protocols เพื่อรองรับ Git Flow เฉพาะทาง (Staging-centric) โดยเน้นไปที่การสั่งการ Remote Agents (Fleet) ให้ทำงานบนฐานที่ถูกต้อง

## Insight

1.  **Strict Base Branch**: กำหนดให้ `staging` เป็น **Absolute Base Branch** สำหรับทุกภารกิจ (ทั้ง Local และ Remote)
2.  **Implementation Protocol (impl.md)**: เพิ่มขั้นตอนใน "Phase 0" เพื่อบังคับให้มีการระบุ Base Branch และกำชับ Remote Agent ให้เปิด PR กลับมาที่ `staging` เท่านั้น
3.  **Conductor Responsibility (oracle-keeper.md)**: มอบหมายให้ 'o' (The Conductor) เป็นผู้ตรวจสอบและกำกับดูแล "Targeting Rule" นี้ก่อนการ Warp ทุกครั้ง
4.  **Workflow Cycle**: `staging` -> `feature/*` -> `merge to staging` -> `PR to main`. (Remote Agents รับผิดชอบแค่ส่วนแรก)

## Apply When
- ทุกครั้งที่เริ่มภารกิจใหม่ (`/impl`) หรือทำการส่งงานต่อให้ Remote Agents (Warping).

## Tags
`git-flow` `staging-first` `parallelism-v2.3` `conductor-rules`