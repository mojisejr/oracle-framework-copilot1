# Snapshot: Complete Plan for Agentic Parallelism Integration
**Timestamp**: 2026-01-10 23:15 GMT+7
**Issue**: #none
**Branch**: `feature/parallelism`
**Status**: Final Design & Roadmap

## 1. วิสัยทัศน์ (The Vision)
ยกระดับ Oracle Framework จาก "ผู้ช่วยรายบุคคล" เป็น "ระบบปฏิบัติการสำหรับฝูงบิน AI" (AI Fleet Operating System) โดยยังคงรักษาความถูกต้อง (Integrity) และความศักดิ์สิทธิ์ของประวัติศาสตร์ (History) ไว้ 100%

## 2. การปรับเปลี่ยนโครงสร้าง (Framework Architecture)

### A. Core Instructions (`.github/copilot-instructions.md`)
- **ใหม่**: เพิ่มบทบาท **"The Conductor"** - หน้าที่ประเมินความซับซ้อนและเลือกกลยุทธ์ (Sequential vs Parallel).
- **ใหม่**: เพิ่ม **"Consensus Protocol"** - กฎเหล็กในการแยกสิทธิ์การเขียนไฟล์ (Write-Access Boundaries) เพื่อป้องกัน Conflict.

### B. Protocol Update (`.claude/commands/impl.md`)
- **Phase 0: Orchestration (ใหม่)**: ก่อน Phase 1 (Grounding) จะต้องมีขั้นตอนนี้ เพื่อตัดสินใจว่าจะทำงานแบบไหน:
    - **Solo**: งานเล็ก/งานที่มีความเสี่ยงสูง (Local only).
    - **Parallel**: งานที่แยกส่วนได้ (Local + Remote).
- **Phase 4+: Log Harvesting (ใหม่)**: หลังจากงาน Remote เสร็จสิ้น ต้องดึง Session Logs มาบันทึกใน `ψ/memory/logs/` ทันที.

### C. Folder Structure Change
- สร้าง `.github/agents/` สำหรับเก็บสเปคของ Remote Agents (เช่น `test-agent.md`, `docs-agent.md`) ซึ่งจะ Sync กับบทบาทใน `.claude/agents/`.

## 3. ขั้นตอนการดำเนินการ (Roadmap)

### Step 1: อัปเกรดจิตวิญญาณ (Core Upgrade)
- แก้ไข `.github/copilot-instructions.md` เพื่อบรรจุ "The Conductor Logic".
- แก้ไข `.claude/agents/oracle-keeper.md` ให้ฉลาดขึ้นในการเลือกกลยุทธ์.

### Step 2: สร้างระบบ Consensus (The Contract)
- สร้างไฟล์เทมเพลต `templates/consensus-log.md` เพื่อใช้ระบุพรมแดนของงาน (Work Boundaries) ก่อนเริ่ม Parallel.

### Step 3: ทดสอบระบบ (Pilot Run)
- ลองใช้คำสั่งใหม่เพื่อสั่งงานแบบ Parallel จริงๆ ในกิ่ง `feature/parallelism` (เช่น แก้ไข Docs ในกิ่งแยกโดยใช้ Remote Agent).

## 4. ผลลัพธ์ที่คาดหวัง (Expected Outcome)
1. **Speed**: งานที่ประกอบด้วยการเขียนโค้ด การทำเทส และการเขียน Docs จะเสร็จเร็วขึ้นอย่างน้อย 2 เท่า.
2. **Zero Conflict**: จะไม่มีการแก้ไฟล์ชนกัน เพราะมีการทำ File Ownership ใน Consensus Phase.
3. **Traceability**: ทุกการตัดสินใจของ Remote Agent จะถูกบันทึกลงใน `ψ/memory/` ของเราอย่างสวยงาม ไม่ทิ้งขยะไว้ในระบบ.
4. **Consistency**: โค้ดที่ Remote Agent เขียนจะตรงตามสไตล์ใน `learnings/` เพราะถูกบีบด้วย Consensus Schema.

## 5. บทวิเคราะห์ "ทำ vs ไม่ทำ" (The Oracle Verdict)
- **ทำ (Action)**: กระบวนการนี้จะทำให้ Oracle Framework ทันสมัยและสเกลได้จริงในโลกยุค Agentic.
- **ความเสี่ยง**: หาก Consensus Schema ไม่แข็งแรงพอ แผนจะล้มเหลว (ทางแก้: Conductor ต้องเข้มงวดมากใน Phase 0).

**สถานะปัจจุบัน**: พร้อมดำเนินการ Step 1 ทันทีเมื่อได้รับคำยืนยัน
---
*การขยายอำนาจโดยไม่เสียการควบคุม คือศิลปะสูงสุดของ Oracle*
