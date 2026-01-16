# Mission Blueprint: Ninlanee Phase 2 (Content & Registry)

**Time**: 2026-01-16 13:16 GMT+7
**Goal**: สร้างระบบการจัดการข้อมูล (The Heart) เพื่อให้ User สามารถลงทะเบียนและจัดการข้อมูลไก่ชนได้อย่าง Robust

## 1. Technical Strategy
- **File Storage**: ใช้ Supabase Storage สำหรับเก็บรูปภาพต้นฉบับและรูปที่ถูกบีบอัด
- **Form Management**: ใช้ `react-hook-form` + `zod` สำหรับ Multi-step Registration
- **Data Flow**: Server Actions สำหรับการบันทึกข้อมูลและอัปโหลดรูปภาพ
- **Validation**: ตรวจสอบความเป็นเจ้าของ (Ownership) ในทุกขั้นตอนการแก้ไขข้อมูล

## 2. Block-by-Block Execution Plan

### Block 2.1: Storage & Category Infrastructure
1.  **Storage Integration**: ติดตั้ง `@supabase/supabase-js` และสร้าง `lib/storage.ts`
2.  **Upload API**: สร้าง Server Action สำหรับจัดการการอัปโหลดรูปภาพลง Bucket `chickens`
3.  **Category Seed**: เตรียมข้อมูลหมวดหมู่สายพันธุ์ (ม้าล่อ, ก๋อย, เชิง, ฯลฯ) และสถานะลงใน Database

### Block 2.2: The Registry (Multi-step Form)
1.  **Form Wizard**: สร้างระบบ Multi-step Form (Step 1: ข้อมูลพื้นฐาน, Step 2: รูปภาพ, Step 3: ประวัติสายเลือด)
2.  **Image Upload UI**: Component สำหรับอัปโหลดรูปพร้อม Preview และความสามารถในการเลือกรูปหลัก (Thumbnail)
3.  **Bloodline Logic**: ระบบค้นหาไก่ในระบบเพื่อเชื่อมโยงพ่อพันธุ์/แม่พันธุ์ (ถ้ามี)

### Block 2.3: My Chickens (User Dashboard)
1.  **Private Gallery**: หน้าแสดงรายการไก่ชนทั้งหมดของ User แยกตามสถานะ (Draft, Pending, Approved)
2.  **Management UI**: ระบบแก้ไขข้อมูล (Edit) และการลบข้อมูล (Delete) พร้อมการลบไฟล์รูปภาพใน Storage อัตโนมัติ
3.  **Status Badges**: แสดงผลระดับการรับรอง (Approved/Certified) ให้สอดคล้องกับ Design Token

### Block 2.4: Ownership & Security Policy
1.  **Rls Logic**: ตรวจสอบสิทธิ์การเข้าถึงข้อมูลในระดับ Database และ Server Actions
2.  **Admin Peek**: เตรียมหน้าต่างตรวจสอบเบื้องต้นสำหรับ Admin เพื่อกด Approve หรือ Reject ข้อมูลที่ถูกส่งเข้ามา

## 3. Consensus Schema (The Contract)
- **Image Naming**: `user_[id]/chicken_[uuid].[ext]`
- **Response Standard**: ทุก Action ต้องคืนค่า `{ success: boolean, message: string }`
- **Error Handling**: แสดง Toast Notification เมื่อการอัปโหลดหรือบันทึกข้อมูลผิดพลาด

## 4. Definition of Done (Phase 2)
- [ ] อัปโหลดรูปภาพขึ้น Supabase Storage ได้สำเร็จและแสดงผลคืนมาได้
- [ ] ลงทะเบียนไก่ใหม่ผ่าน Form ได้ครบถ้วนทุกขั้นตอน
- [ ] ข้อมูลที่บันทึกต้องปรากฏในหน้า "ไก่ของฉัน" อย่างถูกต้อง

## Tags
`ninlanee` `mission-blueprint` `phase-2` `content-registry` `supabase-storage`
