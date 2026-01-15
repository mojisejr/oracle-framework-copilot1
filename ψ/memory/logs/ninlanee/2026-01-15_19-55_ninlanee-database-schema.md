# Snapshot: Ninlanee Final Database Schema (Phase 1)

**Time**: 2026-01-15 19:55 GMT+7
**Context**: การออกแบบ Database Schema สำหรับโปรเจค Ninlanee Farm โดยใช้ Prisma เพื่อรองรับระบบทะเบียนไก่และสายเลือด

## Insight
- **URL Architecture**: ใช้ `CUID` เป็น Primary Key ของตาราง `Chicken` เพื่อสร้าง Public URL ที่ Unique และ Unpredictable ตั้งแต่ตอนสร้าง (`/cert/:cuid`)
- **Pedigree Logic**: ออกแบบโครงสร้างแบบ Self-Relation ในตาราง `Chicken` (`sireId`, `damId`) เพื่อให้สามารถ QUERY สายเลือดขึ้นไปได้ไม่จำกัด (พ่อ-แม่-ปู่-ย่า)
- **Two-Step Approval**: แยก `isApproved` (เพื่อโชว์ในเว็บ) และ `isCertified` (เพื่อออกใบเซอร์) ทำให้การจัดการ Workflow ของฟาร์มมีความยืดหยุ่นสูง
- **Auth Alignment**: ผสานโครงสร้างตารางของ Better Auth เข้าไปโดยตรง เพื่อให้พร้อมสำหรับ LINE Login ตั้งแต่วันแรก

## Apply When
- เมื่อเริ่มสร้างโปรเจค Next.js 15 และต้องการรัน `npx prisma db push`
- เมื่อต้องการออกแบบ UI สำหรับหน้าลงทะเบียนไก่ (เพื่อดูว่าต้องส่ง Field อะไรบ้าง)
- เมื่อต้องการทำ Query สำหรับดึงผังสายเลือด (Pedigree Tree)

## Tags
`ninlanee` `database-schema` `prisma` `pedigree-system` `cuid` `better-auth`
