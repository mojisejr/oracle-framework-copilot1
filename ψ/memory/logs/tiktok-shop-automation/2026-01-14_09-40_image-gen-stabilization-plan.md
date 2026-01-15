# Snapshot: Mission Blueprint - Image Gen Stabilization (100% Target)

**Time**: 2026-01-14 09:40 GMT+7
**Context**: TikTok Shop Automation - Phase 5 Recovery
**Status**: PLANNING & CONTRACT DEFINITION

## แผนการดำเนินงาน (Execution Roadmap)

เพื่อให้ Image Pipeline กลับมาทำงานได้ 100% และโครงสร้างบ้านสะอาดที่สุด เราจะดำเนินการตาม 4 ขั้นตอนนี้:

### 1. Centralize Selectors (จัดระเบียบแผนที่ปุ่ม)
- **Action**: ย้าย `IMAGE_SELECTORS` จาก `image-gen.js` ไปยังก้อนกลาง หรือทำให้ `SharedHandlers` ถือ Selectors ที่จำเป็นเอง
- **Goal**: ตัด Dependency ที่ `SharedHandlers` ต้องไปพึ่งพากับ `ImageService` (Decoupling)

### 2. Service Purging (ทำความสะอาดกุญแจซ้ำ)
- **Action**: ลบฟังก์ชัน `handleFillImages`, `handleFillPrompt`, `handleImageGenerate` ออกจาก `image-gen.js`
- **Result**: `ImageService` จะเหลือเพียงขั้นตอนเฉพาะทางคือ `handleImageStart` (เริ่มโปรเจกต์), `configureImageSettings` (ตั้งค่าหน้าจอ), และ `handleImageWaitResult` (รอผลลัพธ์)

### 3. State Machine Rewiring (เดินสายไฟใหม่)
- **Action**: ปรับ `executeState` ใน `flow-state-machine.js` ให้แทรกขั้นตอน `configureImageSettings` เข้าไประหว่าง `START` และ `FILL_IMAGES`
- **Goal**: ทำให้ระบบเปลี่ยนเป็นโหมด Portrait (9:16) และตั้งค่า Output=1 ทุกครั้งโดยอัตโนมัติ

### 4. Robustness Polish (เสริมเกราะป้องกัน)
- **Action**: ปรับปรุง Logic ใน `SharedHandlers.handleGenerate` ให้ฉลาดขึ้นในการหาปุ่ม (ใช้ Selector หลายรูปแบบ) และเพิ่มการ Retry ที่เสถียรกว่าเดิม

## ผลลัพธ์ที่คาดหวัง (Definition of Done)
- [ ] Image Flow สามารถรันตั้งแต่ต้นจนจบ (End-to-End) โดยไม่มี `ReferenceError`
- [ ] หน้าจอ Google Flow ถูกตั้งค่าเป็น Portrait โดยอัตโนมัติ
- [ ] โค้ดไม่มีส่วนซ้ำซ้อน (Zero Duplication between Shared & Image Service)

## คำถามที่ต้องยืนยัน (Confirmation Needed)
- **Selectors Management**: คุณโอเคไหมถ้าผมจะรวม Selectors ที่ใช้ร่วมกันไว้ใน `SharedHandlers` เลยเพื่อให้มันเป็นอิสระ (Independent) จากไฟล์อื่น?

## Tags
`blueprint` `refactoring` `stability` `recovery`
