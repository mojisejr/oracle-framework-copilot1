# Snapshot: Robust Toast & Redirection Integration

**Time**: 2026-01-16 15:03
**Context**: Fixing the "Triple Toast" bug and build alignment in Ninlanee project.

## Insight

ใน Next.js (โดยเฉพาะเวอร์ชัน 16.1.2) การใช้ `redirect()` ใน Server Action ภายในบล็อก `try/catch` ของ Client Component จะทำให้เกิดข้อผิดพลาดเทียม (Framework error) ในฝั่ง Client เนื่องจาก `redirect()` ทำหน้าที่โยน Error ประเภท `NEXT_REDIRECT` เพื่อควบคุม Flow การทำงาน

**ปัญหาที่พบ:**
1. **Triple Toast**: เมื่อ Submit สำเร็จ `redirect()` จะถูก Client จับได้ใน `catch` และแสดง toast error ("Something went wrong") พร้อมกับ toast success ที่เกิดจาก logic ในหน้าปลายทาง
2. **Double Success**: `useEffect` ใน Strict Mode ทำงานสองครั้ง ทำให้ toast success ปรากฏซ้อนกัน

**วิธีแก้ไข:**
1. ใช้ `unstable_rethrow(error)` จาก `next/navigation` ในบล็อก `catch` เพื่อปล่อยให้ Framework จัดการการ redirect เองโดยไม่ต้องผ่าน logic การแสดง Error ของเรา
2. ใช้ fixed `id` ใน `toast.success` (เช่น `{ id: 'dashboard-success' }`) เพื่อให้ Sonner ทับซ้อน toast เดิมแทนที่จะขึ้นใหม่เมื่อ `useEffect` ทำงานซ้ำ

## Apply When

- เมื่อมีการใช้ Server Actions ร่วมกับ `redirect()` และต้องการจัดการ Error ในฝั่ง Client อย่างถูกต้อง
- เมื่อพบปัญหา Toast แจ้งเตือนซ้ำซ้อนใน React Strict Mode

## Tags

`nextjs` `server-actions` `sonner` `redirection` `robustness` `strict-mode`
