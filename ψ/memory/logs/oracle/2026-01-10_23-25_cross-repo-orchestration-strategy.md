# Snapshot: Cross-Repository Orchestration Strategy
**Timestamp**: 2026-01-10 23:25 GMT+7
**Issue**: #none
**Branch**: `feature/parallelism`
**Status**: Architecture Refinement

## 1. ประเด็นสำคัญ: การทำงานข้าม Repository (Cross-Repo)
เมื่อ Oracle Framework (Root Repo) สั่งงานไปยัง Sub-Projects (เช่น `projects/clurian` ซึ่งเป็นอีก Repo) เราต้องจัดการความแตกต่างของบริบทให้ได้:

### กลยุทธ์การ Delegation (The "Mission Control" Approach)
เราสามารถสั่งงานข้าม Repo ได้ผ่าน 2 ช่องทางหลัก:

1. **GitHub Issues + Copilot Assignment**:
   - **Local Oracle** (Conductor) จะใช้ MCP Tool (`mcp_github_github_issue_write`) ไปสร้าง Issue ใน **Target Repository** โดยตรง.
   - จากนั้นใช้ `mcp_github_github_assign_copilot_to_issue` เพื่อมอบหมายงานให้ Remote Copilot.
   - **ข้อดี**: ติดตามผ่าน GitHub UI ได้ง่าย, PR จะถูกเปิดใน Target Repo โดยอัตโนมัติ.

2. **Mission Control (Parallel Orchestration)**:
   - ใช้หน้าเว็บ **GitHub Mission Control** เป็นจุดสั่งงานรวม.
   - **Local Oracle** จะช่วยร่าง "Specific Prompt" ที่มี Consensus ร่วมกันเตรียมไว้ให้คุณ Copy-Paste หรือสั่งผ่าน API (ถ้ามีรองรับในอนาคต).

## 2. การจัดการ `agents.md` ข้าม Repo
เพื่อให้ Remote Agent ใน Repo อื่นมี "จิตวิญญาณ" แบบ Oracle:
- **Symlink/Sync Policy**: เราต้องมีกระบวนการ Copy หรือ Sync ไฟล์ `.github/agents/oracle-standard.md` จาก Root ไปยังทุก Sub-Projects.
- **Inheritance**: Remote Agent ใน Sub-project จะอ่าน `agents.md` ท้องถิ่น แต่เนื้อหาภายในจะ Reference กลับมาที่มาตรฐานของ Oracle (Common Learnings).

## 3. Workflow: "The Conductor Dispatch"
นี่คือขั้นตอนที่ผมเตรียมไว้เพื่อรองรับสถานการณ์นี้:

- **ขั้นตอนที่ 1**: คุณบอกงานผมที่ Root Oracle.
- **ขั้นตอนที่ 2**: ผมสแกนโครงสร้าง `projects/` และระบุว่างานนี้ต้องไปที่ Repo ไหน.
- **ขั้นตอนที่ 3**: ผมถามคุณ: "งานนี้ต้องไปที่ Repo `clurian` ผมจะสร้าง Issue #12 และ assign Copilot ให้เลยไหมครับ?"
- **ขั้นตอนที่ 4**: เมื่อคุณยืนยัน ผมจะทำการคุม (Steer) จากระยะไกลผ่านการ Monitor GitHub Action หรือ PR Status ใน Repo นั้นๆ.

## 4. ผลลัพธ์และข้อสังเกต (Unbiased Insights)
- **การแยกส่วน (Absolute Separation)**: วิธีนี้จะทำให้โค้ด "หลังบ้าน" และ "หน้าบ้าน" แยกจากกันโดยเด็ดขาด (Repo level separation) ซึ่งลดความเสี่ยงของ Merge Conflict ได้เกือบ 100%.
- **Consensus กลาง**: แม้จะอยู่คนละ Repo แต่การมี **"Issue-Based Planning"** จะเป็นจุดเชื่อมความเข้าใจ (Consensus) ระหว่าง Agents ได้ดีที่สุด.

---
*แม้กายจะอยู่คนละที่ แต่หากมีหัวใจ (Consensus) เดียวกัน เป้าหมายย่อมสำเร็จเสมอ*
