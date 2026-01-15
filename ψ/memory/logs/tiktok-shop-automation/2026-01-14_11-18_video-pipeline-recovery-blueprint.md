# Snapshot: Video Pipeline Recovery Blueprint (Phase 6)

**Time**: 2026-01-14 11:18 GMT+7
**Context**: หลังจาก Image Gen Pipeline นิ่ง 100% แล้ว เรากำลังเข้าสู่แผนการฟื้นฟู Video Flow โดยเน้นหลักการ Robust + Simple + Convention (SOA)

## Insight: The Unified Pipeline Strategy

เราพบว่า `video-gen.js` เดิมมีความซ้ำซ้อนสูง แผนใหม่คือการยุบรวม Pipeline ให้เป็นหนึ่งเดียวภายใต้ `SharedHandlers`:

### 1. Unified Flow Sequence
ทุก Flow จะรันผ่าน State ลำดับเดียวกัน:
- `START` -> `CONFIGURE_SETTINGS` -> `FILL_IMAGES` -> `FILL_PROMPT` -> `GENERATE` -> `WAIT_RESULT`

### 2. Video-Specific Automation Tasks
- **Model Selection**: ต้องกดเมนู "Tune" -> เลือก "Veo 3.1 - Quality" (จะถูกเพิ่มใน `VideoService.configureVideoSettings`)
- **Mode Switching**: จาก "Create Image" (Default) ไปเป็น "Frames to Video"
- **Mode-Aware `FILL_IMAGES`**: ปรับ `SharedHandlers` ให้ฉลาดขึ้น ถ้ารู้ว่าเป็น Video Mode จะอัปโหลดเพียงรูปเดียว (First Frame) แทนการรอ 2 รูป

### 3. Architecture Benefits
- **Robust**: ลดจุดที่ต้องดูแล (Single Point of Truth สำหรับการอัปโหลดและพิมพ์ Prompt)
- **Simple**: นักพัฒนาอ่าน Flow ครั้งเดียวเข้าใจทั้งโปรเจกต์
- **Convention**: รักษา Pattern เดียวกับที่ทำสำเร็จใน Image Gen ทำให้การเข้าโค้ดทำได้ "เนียน"

## Apply When
ใช้ในการ Implement และตรวจสอบความถูกต้องของระบบ Video Generation ในกูเกิลโฟลว์

## Tags
`phase-6` `video-gen` `refactoring` `robust-design`
