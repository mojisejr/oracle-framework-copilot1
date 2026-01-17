# Snapshot: Local Swarm Failure & Path Hallucination Analysis

**Time**: 2026-01-17 07:15
**Context**: วิเคราะห์ปัญหาความล้มเหลวของการใช้ระบบ Local Swarm (Multi-session) ในการพัฒนา Ninlanee และ mmv-tarots เมื่อวันที่ 16 ม.ค. 2526

## Insight

1.  **Context Window Exhaustion**: การใช้ Protocol ที่ซับซ้อนเกินไป (เช่น `/impl` 5 เฟส, Swarm Plan, Agent Instructions) กินพื้นที่ Token ต่อรอบ (Turn) สูงถึง 4,000-5,000 Tokens ทำให้โมเดลเริ่ม "ตัดตอน" ข้อมูลสำคัญทิ้งเพื่อเอาตัวรอด
2.  **Directory Hallucination**: เมื่อ Context ไม่พอ AI จะเริ่มสูญเสียการติดตามตำแหน่ง (CWD) และสันนิษฐานตำแหน่งเอาเอง ส่งผลให้มีการสร้างโฟลเดอร์ซ้ำซ้อน เช่น `projects/mmv-tarots/projects/mmv-tarots/..` (Nested Shadow Folders)
3.  **The Connectivity Paradox**: การแยก Worktree/Session ทำให้ความทรงจำแบบศูนย์กลาง (Oracle Framework) ทำงานได้ยากขึ้น เพราะ AI ในแต่ละวินโดว์มองไม่เห็นบริบทของกันและกันแบบ Real-time จนทำให้ตอนสรุป RRR ข้อมูลปะปนก้น
4.  **Protocol Overhead**: "ต้นทุน" ของการวางแผน (Planning Overhead) สูงกว่า "มูลค่า" ของการลงมือทำจริง (Actual Execution) ในโปรเจกต์ระดับ Solo/Small Dev

## Apply When

- เมื่อต้องการตัดสินใจเลือกระหว่าง Solo-Dev Workflow กับ Multi-Agent Workflow
- เมื่อพบอาการ AI เริ่มสร้างไฟล์ใน Path ที่ผิดหรือซ้ำซ้อน
- เมื่อรู้สึกว่า AI เริ่มสรุปคำตอบหรือลืมคำสั่งเร็วเกินไป (Signs of Context Pressure)

## Tags

`oracle-framework` `local-swarm` `hallucination` `context-window` `protocol-failure`
