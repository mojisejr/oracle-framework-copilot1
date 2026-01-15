# Snapshot: Unified Pipeline Logic Collision (Video vs Image)

**Time**: 2026-01-14 12:14
**Context**: Refactoring Phase 6 (Video Pipeline Recovery) using a unified state machine architecture for the Google Flow.

## Insight

การพยายามทำ "Unified Pipeline" โดยใช้ Handler เดียวกัน (`FILL_IMAGES`) สำหรับทั้ง Image และ Video flow ทำให้เกิดปัญหา **Logic Collision**:
1. **AI สับสนในการเลือกแหล่งข้อมูล**: พยายามใช้ `characterImageUrl` (ของ Image flow) แทนที่จะใช้ `generatedImageUrl` (ของ Video flow) เป็น Start Frame
2. **UI Interaction แตกต่างกัน**: Image flow ต้องการ 2 อัปโหลด (Character + Product) แต่ Video (Frames to Video) ต้องการเพียง 1 อัปโหลด (Start Frame) ส่งผลให้ระบบค้าง (Hang) เพราะหาปุ่มอัปโหลดรูปที่สองไม่เจอใน Video UI

**บทเรียนสำคัญ**: แม้ State Machine จะ Unified ได้ แต่ Data Mapping และ UI Execution ใน Handler ต้องมี Mode-Awareness ที่เข้มงวด หรือแยก Service Logic ให้เด็ดขาดกว่านี้เพื่อความ Robust ตามมาตรฐาน Solo-Dev Optimization

## Apply When

- เมื่อต้องการรวม Flow ที่มีขั้นตอนคล้ายกันเข้าด้วยกันใน State Machine
- เมื่อต้องจัดการกับ Data Fields ที่ชื่อต่างกันแต่ทำหน้าที่คล้ายกันในบริบทต่างกัน (`imageUrl` vs `generatedImageUrl`)

## Tags

`automation` `refactoring` `bug-report` `logic-collision` `video-gen`
