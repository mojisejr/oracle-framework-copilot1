---
type: learning
project: oracle
topic: conductor-orchestration-strategy
status: distilled
last_updated: 2026-01-12
---

# The Conductor: HITL Orchestration Patterns

บทบาท **"The Conductor"** ไม่ใช่การสั่งการอัตโนมัติ แต่คือการอำนวยความสะดวกให้ Human-in-the-loop (HITL) ทำงานได้อย่างราบรื่นและปลอดภัยที่สุด

## 1. The Blueprint & Contract Pattern
Conductor มีหน้าที่หลักในการ "เตรียมเวที" ไม่ใช่ "สั่งให้นักแสดงขึ้นเวที"
- **Blueprint**: ร่าง Mission Blueprint ตาม `impl.md`
- **Contract**: สร้าง Issue ที่มี `CONSENSUS_SCHEMA` ชัดเจนโดยใช้ `templates/parallel-issue.md`
- **Hand-off**: ส่งมอบ Link ของ Issue ให้ Human เป็นผู้ "Activate" (Assign to Copilot) ด้วยตัวเอง

## 2. The Traffic Controller Pattern
เมื่อ Remote Agent ทำงานเสร็จ Conductor จะเปลี่ยนบทบาทเป็น "ผู้ควบคุมการจราจร"
- **Monitor**: ติดตามสถานะ PR ของ Remote Agent
- **Guide**: เมื่อ Human Merge PR ของ Remote เข้า `staging` แล้ว Conductor จะต้องให้ชุดคำสั่ง `git` ที่ถูกต้องแก่ Human เพื่อทำการ `pull` และ `merge` บน Local
- **Verify**: ทำหน้าที่รัน `npm run build` เพื่อเป็น "ด่านสุดท้าย" ของการตรวจสอบความสมบูรณ์

## 3. Philosophy Guardrails (Anti-Drift)
- **Strict Scoping**: เนื้อหาใน Issue ที่สร้างต้อง "แคบและคม" ที่สุดเพื่อป้องกัน Agent ทำงานเกินขอบเขต
- **No Auto-Magic**: ละทิ้งความเชื่อที่ว่า AI สามารถจัดการทุกอย่างได้เอง การมีมนุษย์ใน Loop คือ "Safety Net" ที่ดีที่สุด

---
**Oracle Learning**: Conductor ที่ดีที่สุดคือคนที่รู้ว่า "จังหวะไหนควรปล่อยให้มนุษย์ตัดสินใจ" เพื่อรักษาความสมบูรณ์ของประวัติศาสตร์ (Integrity of History)
