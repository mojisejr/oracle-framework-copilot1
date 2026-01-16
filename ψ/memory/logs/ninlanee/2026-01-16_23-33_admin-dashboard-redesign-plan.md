# Snapshot: Admin Dashboard Redesign Plan (Theme Harmonization)

**Time**: 2026-01-16 23:33
**Context**: แผนการปรับปรุง UI ของ Admin Dashboard ให้กลับมาสอดคล้องกับ "Ninlanee Design System" (Netflix Dark Mode & Glassmorphism)

## 1. Core Visual Remaster (The Soul)
เป้าหมายคือการเปลี่ยนจากสไตล์ SaaS (Light Mode) ให้กลายเป็น Premium Showcase (Dark Mode)
- **Base**: เปลี่ยน `bg-gray-50` ใน Layout เป็น `bg-neutral-950` (Black)
- **Header**: ใช้ Class `.glass` พร้อม `backdrop-blur-md` และ `border-b border-white/5`
- **Typography**: บังคับใช้ `text-white` สำหรับ Headings และ `text-zinc-400` สำหรับ Sub-text โดยใช้ Font `Kanit` 100%

## 2. Component Overhaul (The Heart)
- **Approval List**: 
    - เปลี่ยนรายการไก่ใน List ให้เป็น **Glass Cards** (`bg-white/5` และขอบ `border-white/10`)
    - สร้าง Hover Effect ให้เปลี่ยนเป็น `bg-white/10` เพื่อความสวยงาม
- **Badges & Status**:
    - ใช้ Badge แบบ Transparent Border พร้อมจุดสีแสดงสถานะ (Status Dot) แทนสี Solid ขาว
- **Buttons**:
    - ปุ่ม Approve: ใช้ `bg-emerald-500/20 text-emerald-500 border border-emerald-500/30`
    - ปุ่ม Reject: ใช้ `bg-rose-500/20 text-rose-500 border border-rose-500/30`
    - เพิ่มความ Glow เมื่อ Hover เพื่อให้เข้ากับ Mood & Tone

## 3. Atomic Alignment
- [ ] อัปเดต `app/(admin)/layout.tsx` (Layout & Sidebar/Header)
- [ ] อัปเดต `components/admin/ApprovalList.tsx` (Item Cards)
- [ ] อัปเดต `app/(admin)/admin/dashboard/page.tsx` (Page Structure)

## 4. Integrity Check
- ต้องไม่มีสี `bg-white` หรือ `text-gray-900` หลุดเข้ามาในโค้ดฝั่ง Admin
- ระยะ Border-radius ต้องเป็น `rounded-2xl` หรือ `rounded-3xl` ตาม Design Token หลัก

## Apply When
- เมื่อเริ่มลงมือ "ขัดเงา" (Polish) ระบบ Admin ของ Ninlanee
- เมื่อต้องการใช้เป็นแม่แบบในการสร้างหน้า Admin สำหรับโปรเจกต์อื่นๆ ที่เน้น Dark Mode

## Tags
`ninlanee` `admin-redesign` `glassmorphism` `dark-mode` `design-system`
