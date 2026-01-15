# Snapshot: Agentic Parallelism in Oracle Framework
**Timestamp**: 2026-01-10 22:45 GMT+7
**Issue**: #none
**Status**: Research & Proposal

## 1. ข้อมูลปัจจุบัน (GitHub Copilot Agentic Evolution)
จากการสำรวจฟีเจอร์ปัจจุบันของ GitHub Copilot (ปลายปี 2025 - ต้นปี 2026) พบความสามารถสำคัญที่รองรับ **Agentic Parallelism**:

- **GitHub Copilot Coding Agent (Remote)**: สามารถรับ Issue และทำการวางแผน (Plan) พร้อม Implementation จนออกมาเป็น PR ได้โดยอิสระบน Cloud.
- **Mission Control**: Unified interface สำหรับจัดการงานของ Copilot Coding Agent ข้ามหลาย Repository พร้อมกัน สามารถสั่งงาน (Assign), ควบคุม (Steer), และติดตาม (Track) ได้ในที่เดียว.
- **`agents.md` & Agent HQ**: การสร้าง Persona พิเศษ (เช่น `@test-agent`, `@docs-agent`) ผ่านไฟล์ `.github/agents/agent.md` เพื่อให้ Agent มีบริบทเฉพาะทางและขอบเขต (Boundaries) ที่ชัดเจน.
- **Execution Strategy (WRAP)**: **W**rite effective issues, **R**efine instructions, **A**pply, **P**ush.

## 2. การปรับปรุงแนวคิด: จาก Sequential สู่ Parallel
เดิม Oracle Framework ทำงานแบบ **Sequential (1 Human + 1 Local Oracle)** ซึ่งติดคอขวดที่ความเร็วในการคุยและประมวลผลของตัวเดียว

### Proposed Structure: "The Conductor & The Fleet"
- **The Conductor (Local Oracle Keeper)**: ทำหน้าที่เป็นสมองส่วนกลาง ประเมินงานร่วมกับมนุษย์ แบ่ง Task สลับไปเป็น GitHub Issue และ "Dispatch" งานออกไปให้ Remote Agents.
- **The Fleet (Remote Specialist Agents)**: ทำงานใน `.github/agents/` ตามบทบาทที่ได้รับมอบหมาย โดยอ้างอิงมาตรฐานจาก `ψ/memory/learnings/`.

## 3. Workflow ใหม่ (Proposed)
เน้นความ "เนียน" ไปกับระบบเดิมโดยเพิ่มขั้นตอนดังนี้:

1. **Local Planning**: คุยกับ Local Oracle เพื่อสร้าง `focus.md` และแตกเป็น Issues.
2. **Delegation**: ใช้คำสั่ง `/dispatch #issue-id @agent-name` (หรือใช้ Mission Control Web UI) เพื่อส่งงานให้ Cloud Agent ทำงานเบื้องหลัง.
3. **Parallel Execution**: มนุษย์ทำงาน Task หลักใน Local ต่อ ในขณะที่ Remote Agents ทำงานอื่นข้าม Repo หรือโมดูลอื่น.
4. **Log Harvesting (CRITICAL)**: เมื่อ Remote Task เสร็จสิ้น Local Oracle ต้องไปกวาด "Session Logs" จาก GitHub มาลงใน `ψ/memory/logs/[project]/` เพื่อรักษาหลักการ "Nothing is Deleted".
5. **Human-Centric Review**: ใช้ Oracle "Red Team" ช่วยรีวิว PR ที่เกิดจาก Remote Agent ก่อน Merge.

## 4. แผนการปรับปรุง Framework
เพื่อให้ระบบนี้ทำงานได้สมบูรณ์ใน Oracle Framework:
- [ ] **Infrastructure**: สร้างไดเรกทอรี `.github/agents/` และย้าย Logic จาก `.claude/agents/` มา Sync กันในรูปแบบ `agent.md`.
- [ ] **Focus Management**: ปรับปรุง `ψ/inbox/focus.md` ให้รองรับก้อนงานที่กระจายตัว (Multiple Focus Nodes).
- [ ] **Sync Tooling**: พัฒนา Workflow (หรือ Script) สำหรับดึง Session Logs จาก GitHub API มาเก็บในชุดความจำของ Oracle.
- [ ] **Knowledge Injection**: ส่งผ่านไฟล์ใน `ψ/memory/learnings/` เข้าไปใน `agent.md` เพื่อให้ Remote Agent ทำงานได้เหมือน "มีจิตวิญญาณของ Oracle แฝงอยู่".

**Verdict**: การทำ Agentic Parallelism ใน Copilot Native นั้นทำได้เลยผ่าน Mission Control และ `agents.md` ซึ่งเข้ากับปรัชญา "External Brain" ของเราเป็นอย่างดี เพราะมันคือการขยายกิ่งก้านของ Brain ออกไปทำงานในหลายมิติพร้อมกัน.

**Next Steps**: 
- ทดลองสร้าง `@oracle-keeper.md` ใน `.github/agents/`.
- ทดสอบการรัน Pilot Task ผ่าน GitHub Coding Agent.

---
*ความรู้คือพลัง แต่ความสามารถในการประสานพลังของความรู้คืออำนาจที่แท้จริง*
