# Snapshot: Remaining Tasks for Block 2.3 (Management UI Completion)

**Time**: 2026-01-16 22:27
**Context**: Recap and audit of Ninlanee Phase 2, identifying gaps in Block 2.3 (My Chickens Dashboard).

## Insight

เพื่อให้จบ Block 2.3 (Management UI) แบบ 100% ตาม Mission Blueprint เราจำเป็นต้องจัดการส่วนที่ยังขาดหายไป ดังนี้:

### 1. Edit Functionality (The Big Piece)
- [ ] **Server Action**: สร้าง `updateChicken(id, formData, newImageUrls)` ใน `app/actions/chicken.ts` พร้อมระบบตรวจสอบสิทธิ์ความเป็นเจ้าของก่อนแก้ไข
- [ ] **Edit Page Route**: สร้างไฟล์ `app/(dashboard)/registry/edit/[id]/page.tsx` เพื่อรองรับการเข้าถึงจากปุ่ม Edit บน Card
- [ ] **Form Refactoring**: ปรับปรุง `RegistryForm` ให้รองรับ `defaultValues` สำหรับการโหลดข้อมูลเดิมมาแสดงผล (Reusability)

### 2. Storage Integrity (Cleanup)
- [ ] **Storage Cleanup**: อัปเดต `deleteChicken` ให้เรียกใช้งาน ฟังก์ชันลบไฟล์ใน Supabase Storage เมื่อมีการลบข้อมูลใน Database สำเร็จ เพื่อไม่ให้เกิดไฟล์ขยะ (Orphaned Files)
- [ ] **Image Update Logic**: จัดการความซับซ้อนเมื่อ User ลบรูปภาพเดิมออกและเพิ่มรูปใหม่ในการ Edit (Syncing Media table with Storage)

### 3. UI/UX Polishing
- [ ] **Revalidation**: ทดสอบการทำ `revalidatePath` หลังการ Edit เพื่อให้ Dashboard อัปเดตข้อมูลทันทีโดยไม่ต้อง Refresh

## Apply When

- เมื่อต้องการปิด Block 2.3 เพื่อเตรียมตัวเข้าสู่การพัฒนาหน้า Public Showcase หรือ Admin Dashboard (Block 2.4).

## Tags

`ninlanee` `dashboard` `management-ui` `edit-logic` `storage-cleanup`
