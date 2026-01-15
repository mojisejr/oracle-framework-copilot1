# Snapshot: Ninlanee Farm Final Blueprint (Simple & Robust Protocol)

**Time**: 2026-01-15 14:56 GMT+7
**Context**: สรุปโครงสร้างและ Tech Stack ขั้นสุดท้ายสำหรับโปรเจค Ninlanee Farm หลังจากการวิเคราะห์ memory และความต้องการของลูกค้า

## 1. Core Vision
เปลี่ยนแพลตฟอร์ม "นินลนีย์ ฟาร์ม" ให้เป็นระบบทะเบียนไก่ชนพรีเมียมที่มี UI สไตล์ Netflix (High Quality, Image-Centric) โดยยึดหลักการ "Simple + Robust" ของ Oracle

## 2. Tech Stack Finalization
| Layer | Tech | Note |
|-------|------|------|
| **Frontend** | Next.js 15 (App Router) | บังคับใช้ `next/image` 100% |
| **Auth** | Better Auth (LINE Login Only) | เลียนแบบ Protocol จาก `mmv-tarots` |
| **Database** | PostgreSQL + Prisma | เก็บข้อมูล Relational สายเลือดไก่ (ทวด-ปู่-ย่า-พ่อ-แม่) |
| **File/DB Hosting** | Supabase | ใช้เป็น Database, Storage และ Image Management |
| **Export** | html-to-image | ออกแบบ Certificate เป็นภาพ (PNG/JPG) เพื่อการแชร์ที่สะดวก |
| **Notification** | LINE Messaging API | แจ้งเตือน Admin ผ่าน LINE OA (แทน LINE Notify) |

## 3. Key Decisions & Rationales
- **No Sanity CMS**: ตัดออกเพื่อลดความซับซ้อน (Single Source of Truth ใน Supabase)
- **Image Over PDF**: เลือก Export เป็นภาพเพื่อแก้ปัญหาฟอนต์ไทยและรองรับพฤติกรรม User ที่ชอบแชร์ลง Social Media
- **Better Auth Protocol**: ใช้บทเรียนจาก `mmv-tarots` ในการจัดการ Social Login และ Session Extension (role, farmName)
- **Friction Protocol**: ระวังเรื่อง Image Optimization และการออกแบบ Pedigree Schema ที่ต้องรองรับ Recursive Query (สายเลือด)

## 4. Next Milestone
[ ] ออกแบบ Prisma Schema สำหรับระบบทะเบียนไก่ (Chicken, Breeder, Farm, Pedigree)
[ ] เตรียม UI Design Tokens ตาม `template.html`

## Tags
`ninlanee` `final-blueprint` `better-auth` `line-login` `simple-robust`
