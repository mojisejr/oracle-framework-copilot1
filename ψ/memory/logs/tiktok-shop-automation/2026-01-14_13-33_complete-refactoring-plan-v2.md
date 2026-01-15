# Snapshot: Complete Refactoring Plan for Unified Video/Image Pipeline (v2.0)

**Time**: 2026-01-14 13:33
**Focus**: Recovering Video Pipeline while maintaining 100% stability of Image Pipeline.
**Blueprint Status**: Confirmed (Awaiting Final Implementation)

## 🛡️ Mission Blueprint: Phase 6 Recovery (Final Solidification)

**Objective**: ปรับปรุง Unified Flow ให้รองรับความแตกต่างระหว่าง Image และ Video ในระดับ Data และ UI อย่างสมบูรณ์

### 1. Unified State Machine (Orchestration)
รักษาโครงสร้างเดิมแต่เน้นย้ำความแม่นยำในการเลือก Service:
- `START` → `SWITCH_MODE` (Video only) → `CONFIGURE_SETTINGS`
- `CONFIGURE_SETTINGS`: แยกเรียก `ImageService.configureImageSettings()` หรือ `VideoService.configureVideoSettings()`
- **Unified Handlers**: `FILL_IMAGES` → `FILL_PROMPT` → `GENERATE` (ใช้ `SharedHandlers`)

### 2. Logic Separation in SharedHandlers (The "Heart" of the Fix)
ปรับปรุง `handleFillImages` ใน `shared-handlers.js` ให้เป็น **Mode-Strict**:

| โหมด | Data Source | UI Strategy | Termination |
| :--- | :--- | :--- | :--- |
| **Image** | `characterImageUrl` & `imageUrl` | Index 0 → Index 1 (หลังอัปโหลดรูปแรกสำเร็จ) | อัปโหลดครบ 2 รูป |
| **Video** | **`generatedImageUrl`** (เท่านั้น) | Index 0 (ยืนยันด้วยปุ่ม `swap_horiz`) | **Return ทันที** หลังรูปแรกเสร็จ |

### 3. Safety Gates & Verification
- **UI State Check**: ในโหมด Video ต้องตรวจพบปุ่ม `swap_horiz` ก่อนเริ่มอัปโหลด เพื่อป้องกันการอัปโหลดผิดหน้า
- **Data Integrity**: หากโหมดคือ Video แต่ไม่มี `generatedImageUrl` ให้หยุดและแจ้ง Error ทันที (ห้ามใช้ `characterImageUrl` มาแก้ขัด)
- **Schema Isolation**: อัปเดต `FlowSchema` ให้เก็บสถานะอัปโหลดแยกตามโหมด เพื่อไม่ให้สถานะค้างระหว่างสลับโหมด

### 4. Implementation Checklist
- [ ] **SharedHandlers**: รื้อแก้โครงสร้างวนลูปให้แยก Mode ชัดเจน และเปลี่ยน Data Key สำหรับ Video
- [ ] **VideoService**: ตรวจสอบการ Export ฟังก์ชัน `configureVideoSettings` (Veo 3.1 Selection)
- [ ] **FlowStateMachine**: ตรวจสอบการตั้งค่า `currentMode` และการส่งผ่าน `data` ให้เสถียร

## Resilience Note
"การรวมกันไม่ใช่การทำให้เหมือนกัน แต่คือการสร้างมาตรฐานที่ยืดหยุ่นพอจะรองรับความต่างโดยไม่ทำให้พัง (Consistent but Mode-Aware)"

## Tags
`refactoring-plan` `video-pipeline` `data-integrity` `google-flow`
