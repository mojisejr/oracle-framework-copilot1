# Snapshot: Ninlanee Farm Routing Structure (Phase 1)

**Time**: 2026-01-16 06:25 GMT+7
**Context**: การกำหนดโครงสร้างหน้าเว็บและเส้นทาง (Routing) สำหรับโปรเจค Ninlanee Farm เพื่อรองรับ User และ Public View

## 1. Public Routes
เส้นทางสำหรับผู้เข้าชมทั่วไป เน้น UI Netflix Theme

| Path | Page | Description |
| :--- | :--- | :--- |
| `/` | Home | แหล่งรวม Showcase ไก่ชน แยกตามหมวดหมู่ (Netflix Style Gallery) |
| `/cert/[id]` | Chicken Details | หน้าแสดงข้อมูลเชิงลึก สายเลือด และประวัติ (ID คือ CUID) |
| `/auth/login` | Login | ประตูเข้าสู่ระบบด้วย LINE Login เท่านั้น |

## 2. User Routes (Protected)
เส้นทางสำหรับเจ้าของไก่ (Breeder/Owner)

| Path | Page | Description |
| :--- | :--- | :--- |
| `/profile` | User Dashboard | พื้นที่จัดการไก่ของตัวเอง แก้ไขข้อมูล และดูสถานะ (Pending/Approved) |
| `/profile/register` | Registration Form | แบบฟอร์มลงทะเบียนไก่ใหม่ เพื่อขอการรับรองจากฟาร์ม |
| `/profile/onboarding` | User Setup | การตั้งค่าข้อมูลพื้นฐาน (ชื่อฟาร์ม, เบอร์โทร) หลังการ Login ครั้งแรก |
| `/cert/[id]/download` | Certificate Export | หน้าพิเศษสำหรับดาวน์โหลดใบเซอร์เป็นรูปภาพ (Restricted Access) |

## 3. Admin Routes (Restricted)
เส้นทางสำหรับการจัดการหลังบ้านเบื้องต้น

| Path | Page | Description |
| :--- | :--- | :--- |
| `/admin/approvals` | Approval Queue | รายการไก่ที่รอการตรวจสอบ เพื่อกด Approve/Reject |
| `/admin/users` | User Registry | (Optional) รายชื่อสมาชิกในระบบ |

## 4. Logical Interaction Pattern
- **Modal Overlay**: ใช้ Parallel & Intercepting Routes สำหรับหน้า `/cert/[id]` เพื่อให้สามารถเปิด Modal ทับหน้าแรกได้แบบ Netflix Experience
- **Auth Guard**: ใช้ Middleware ในการตรวจเช็ค Session ของ Better Auth เพื่อป้องกันการเข้าถึงหน้าที่ต้องห้าม
- **Flag Logic**: การเข้าถึงหน้า `/download` จะถูกควบคุมด้วย flag `isCertified` ใน Database

## Apply When
- เมื่อเริ่มสร้าง Folder Structure ใน `app/` directory ของ Next.js
- เมื่อออกแบบระบบ Middleware สำหรับ Auth Protecting
- เมื่อทำการตรวจสอบความถูกต้องของลิงก์ (Navigation Links) ในแต่ละ Component

## Tags
`ninlanee` `routing` `nextjs-app-router` `user-journey` `phase-1`
