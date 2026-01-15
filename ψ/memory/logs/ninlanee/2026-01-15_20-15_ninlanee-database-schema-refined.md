# Snapshot: Ninlanee Final Database Schema (Phase 1) - Extended for Better Auth

**Time**: 2026-01-15 20:15 GMT+7
**Context**: การออกแบบ Database Schema สำหรับโปรเจค Ninlanee Farm โดยเรียนรู้จากโครงสร้าง mmv-tarots (LINE + Better Auth)

## Insight
- **Auth Standardization**: อัปเดตตาราง `User`, `Account`, `Session` ให้ตรงตามมาตรฐาน Better Auth ที่ใช้ใน `mmv-tarots` เช่น การเพิ่ม `accessTokenExpiresAt`, `refreshTokenExpiresAt`, `scope` และการใช้ `@map` เพื่อคุมชื่อฟิลด์ใน DB ให้เป็น snake_case
- **Onboarding Flow**: เพิ่มฟิลด์ `onboarding_completed` ในตาราง `User` เพื่อใช้เป็นตัวเช็คในการทำ Multi-step registration หรือการแนะนำผู้ใช้ใหม่
- **URL Architecture**: ใช้ `CUID` เป็น Primary Key ของตาราง `Chicken` เพื่อสร้าง Public URL ที่ Unique และ Unpredictable ตั้งแต่ตอนสร้าง (`/cert/:cuid`)
- **Pedigree Logic**: ออกแบบโครงสร้างแบบ Self-Relation ในตาราง `Chicken` (`sireId`, `damId`) เพื่อให้สามารถ QUERY สายเลือดขึ้นไปได้ไม่จำกัด
- **Two-Step Approval**: แยก `isApproved` (เพื่อโชว์ในเว็บ) และ `isCertified` (เพื่อออกใบเซอร์) 
- **Database Best Practices**: ใช้ Explicit Mapping (`@map`) สำหรับทุกฟิลด์เพื่อความ Robust และดูแลรักษาง่ายในระยะยาว

## Apply When
- เมื่อเริ่มสร้างโปรเจค Next.js 15 และต้องการเซ็ตอัพ Better Auth ให้สมบูรณ์
- เมื่อต้องการรัน `npx prisma db push` บน Supabase
- เมื่อต้องการทำระบบ Onboarding สำหรับ User ใหม่ที่ login ผ่าน LINE

## Tags
`ninlanee` `database-schema` `prisma` `better-auth` `line-login` `mmv-tarots-pattern`
