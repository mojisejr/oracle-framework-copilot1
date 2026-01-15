# Snapshot: Strategic Instruction Refinement Plan (HITL Parallelism)

**Time**: 2026-01-12 09:15
**Context**: Re-designing the `/impl` protocol and orchestration logic after the "Parallel Pilot" failure to prioritize branch integrity and human-centric control.

## Insight

การทำ Parallelism ที่สมบูรณ์แบบใน Oracle Framework ไม่ใช่การทำ Automation แบบ 100% แต่คือการที่ AI เตรียมความพร้อม (Context/Consensus) ให้ดีที่สุด เพื่อให้มนุษย์ตัดสินใจ "กดปุ่ม" ในจังหวะที่สำคัญที่สุด (Assign/Merge)

## Proposed Workflow (HITL Edition)

1. **Strategic Planning**: AI วิเคราะห์ Modularity ของงาน
2. **Contract Construction**: AI สร้าง `CONSENSUS_SCHEMA` และร่างเนื้อหา Issue
3. **Issue Scaffolding**: AI ใช้เครื่องมือสร้าง Issue (Title: `[Warp] description`) โดย**ไม่ทำ Auto-assign**
4. **Human Activation**: มนุษย์ Assign Copilot และเลือก `staging` branch ผ่าน GitHub UI
5. **Harmonized Integration**:
   - Human merges Remote -> Staging
   - AI pulls Staging -> Local
   - AI integrates Local work -> Local Staging
   - **Verification**: `npm run build` ต้องผ่าน 100%

## Target Edits

1. **[.claude/commands/impl.md](.claude/commands/impl.md)**: ปรับสู่ 5-Phase HITL Protocol
2. **[.claude/agents/oracle-keeper.md](.claude/agents/oracle-keeper.md)**: ปรับบทบาท Conductor เป็น "Traffic Controller"
3. **[templates/parallel-issue.md](templates/parallel-issue.md)**: (New) สร้างมาตรฐานการคุยกับ Remote Agent
4. **[ψ/memory/learnings/2026-01-11_orchestration-conductor-patterns.md](ψ/memory/learnings/2026-01-11_orchestration-conductor-patterns.md)**: อัปเดตบทเรียน และกำจัด Context เก่าที่ล้าสมัย

## Apply When

- ทุกครั้งที่มีการเรียกใช้คำสั่ง `/impl` ที่มีความซับซ้อนและต้องการแตกงานขนาน (Parallel)

## Tags

`hitl` `parallelism` `refinement-plan` `oracle-keeper`
