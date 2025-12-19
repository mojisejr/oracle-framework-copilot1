# Learning: Next.js Image Optimization & Timestamp Integrity

**Date**: 2025-12-19
**Context**: Branding update for `dosage-converter` project.

## 1. Next.js Image Optimization (`next/image`)

### The Mistake
เริ่มต้นด้วยการเสนอการใช้แท็ก `<img>` มาตรฐานสำหรับการเปลี่ยนโลโก้ ซึ่งเป็นการละเลยฟีเจอร์สำคัญของ Next.js

### The Learning
ในโปรเจกต์ Next.js (โดยเฉพาะ App Router) การใช้คอมโพเนนต์ `<Image />` จาก `next/image` เป็นสิ่งจำเป็นเพราะ:
- **Automatic Optimization**: ปรับขนาดภาพตามอุปกรณ์และใช้ฟอร์แมตสมัยใหม่ (WebP/AVIF)
- **Visual Stability**: ป้องกัน Layout Shift โดยอัตโนมัติ
- **Faster Loading**: ใช้ Lazy Loading เป็นค่าเริ่มต้น
- **Responsive Sizing**: สามารถใช้ `width`, `height` ร่วมกับ Tailwind classes เพื่อควบคุมการแสดงผลที่แม่นยำ

**Pattern to Follow**:
```tsx
import Image from 'next/image';

// Use this instead of <img>
<Image 
  src="/path-to-image.png" 
  alt="Description" 
  width={100} 
  height={100} 
  className="w-10 h-10 md:w-14 md:h-14 object-contain"
/>
```

## 2. Timestamp & History Integrity

### The Mistake
อัปเดตวันที่และเวลาใน `focus.md` ผิดพลาด (ระบุวันที่ผิด) ในช่วงเริ่มต้นเซสชัน

### The Learning
ภายใต้ Oracle Framework "History is sacred" และ "Nothing is deleted" ความถูกต้องของเวลา (Timestamp) คือหัวใจสำคัญของการรักษาความจริง (Mirroring reality)

**Guidelines for AI**:
- **Double-Check `date`**: ก่อนอัปเดต `focus.md` หรือสร้าง Log ต้องรันคำสั่ง `date` ใน Terminal เพื่อยืนยันเวลาปัจจุบันของระบบเสมอ
- **Context Awareness**: อย่าพึ่งพาความจำภายใน (Internal Clock) ของโมเดล เพราะอาจคลาดเคลื่อนจากเวลาจริงของผู้ใช้
- **Human Correction**: เมื่อมนุษย์ทักท้วงเรื่องความผิดพลาดของข้อมูลพื้นฐาน (เช่น เวลา) ให้รีบแก้ไขและบันทึกเป็นบทเรียนทันที เพราะมันสะท้อนถึงความใส่ใจในรายละเอียด (Attention to detail)

## Resonance
การที่มนุษย์ (Human) ต้องคอยเตือน AI เรื่องพื้นฐานเหล่านี้ คือการตอกย้ำบทบาทของ Oracle ที่ว่า "The Oracle Keeps the Human Human" — มนุษย์ยังคงเป็นผู้ตัดสินใจและผู้ควบคุมความถูกต้องสูงสุดในระบบนี้
