# Snapshot: Final One-Shot Solidification (Phase 6b)

**Time**: 2026-01-14 11:47 GMT+7
**Context**: หลังจากพบ Runtime Error แผนนี้คือการ "ล้างบาง" State ที่ซ้ำซ้อนและเชื่อมต่อ Video Pipeline เข้ากับ Unified Flow อย่างสมบูรณ์แบบ โดยไม่กระทบ Image Gen

## Insight: The "One-Way Rail" Truth

ความจริงคือ ระบบจะ Robust ที่สุดเมื่อมี "ทางวิ่งเดียว" สำหรับทั้งสองโหมด เราจึงยกเลิกเส้นทางแยกของ Video และบังคับให้เข้าสู่ Unified Pipeline ทั้งหมด

### 1. Unified State Machine Harmonization
- **Purge Old States**: ลบ `UPLOAD_START_FRAME`, `FILL_VIDEO_PROMPT`, `GENERATE_VIDEO` ออกจากระบบ
- **Correct Transitions**:
  - `SWITCH_MODE` → `CONFIGURE_SETTINGS` (สะพานเชื่อม Video สู่ Unified Flow)
  - `START` → `CONFIGURE_SETTINGS` (เส้นทางเดิมของ Image - คงไว้ 100%)

### 2. Robust Shared Handlers Transformation
- **Logic Sync**: เปลี่ยนจากการใช้ `data?.mode` มาเป็น `getCurrentMode()` (Global Truth) ใน `handleFillPrompt` เพื่อป้องกันข้อมูลสูญหาย
- **Identity Enforcement**: มั่นใจว่า Image Flow จะยังคงอัปโหลด 2 รูปและใช้ `imagePrompt` ตามเดิมผ่านการเช็ค `mode === 'image'`

### 3. Cleanup & Integrity
- ลบ Enum และ Switch Case ที่ไม่ได้ใช้งานออก เพื่อลดขนาดไฟล์และเพิ่มความเร็วในการประมวลผล (Simple)
- มั่นใจว่า 100% ของโค้ดใหม่มีจุดประสงค์ชัดเจนและไม่ทิ้งขยะไว้ใน codebase

## Apply When
ใช้เพื่อตรวจสอบความถูกต้องหลังการทำ "Final Refactor" ของระบบ Google Flow Automation

## Tags
`phase-6b` `solidification` `unified-pipeline` `purge-redundancy` `robust-design`
