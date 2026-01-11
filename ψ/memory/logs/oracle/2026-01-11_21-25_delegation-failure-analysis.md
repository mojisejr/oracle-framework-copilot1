# Snapshot: Delegation Failure Analysis (The "Local-Sync" Trap)

**Time**: 2026-01-11 21:25 GMT+7
**Context**: การทดสอบรันคำสั่ง `copilot -p "/delegate ..."` เพื่อวาร์ปงานไปที่ Background แต่พบว่าระบบรันแบบ Local และไม่เกิด Session/PR.

## สิ่งที่เกิดขึ้น (Analysis)

1. **-p is Local-Synchronous**: แฟล็ก `-p` (Prompt Mode) ถูกออกแบบมาเพื่อรันงานใน Terminal ปัจจุบันแบบ "ทันทีและต้องรอ" (Synchronous) มันจึงไปดึงโมเดล `claude-haiku-4.5` มารันในเครื่องคุณ 4 นาทีเต็มๆ แทนที่จะส่งออกไปที่ GitHub Server
2. **Slash Command Ignition Failed**: เมื่อรันผ่าน `-p` ตัว CLI อาจจะมองว่า `/delegate` เป็นเพียง "ข้อความส่วนหนึ่งของ prompt" ไม่ใช่ "คำสั่งควบคุมระบบ (Control Command)" ทำให้มันพยายามทำคำสั่งนั้นด้วยตัวมันเองใน Terminal นั้นเลย
3. **Permission Blockers**: จาก Log พบว่า Agent พยายามเข้าถึงไฟล์และรันคำสั่ง แต่ถูกปฏิเสธ (User Rejected/Permission Denied) ทำให้งานจบลงที่ `0 lines added` โดยที่ยังไม่ได้ทำอะไรสำเร็จ
4. **Session Tab Transparency**: เนื่องจากเป็นการรันแบบจบใน Terminal (Ephemeral Process) มันจึงไม่ส่งสถานะไปที่ "Agent Sessions" ใน UI ของ VS Code ซึ่งปกติจะไว้ติดตามงานที่เป็น Asynchronous หรือ PR-based.

## สรุป: ใช้ไม่ได้ผ่านแฟล็ก `-p`
เราไม่สามารถ "วาร์ปงาน" (Delegate) ผ่านโหมด `-p` ได้ เพราะมันคือโหมด "สั่งแล้วรอ" 

## วิธีการที่ถูกต้อง (The Right Way)
ต้องใช้งานผ่าน **Interactive Mode** เท่านั้น:
1. พิมพ์ `copilot` ใน Terminal เพื่อเข้าสู่โหมดโต้ตอบ
2. เมื่ออยู่ในโหมดโต้ตอบค่อยพิมพ์ `/delegate [งานของคุณ]`

## Tags
`friction` `delegation-failed` `cli-knowledge` `oracle-v2`
