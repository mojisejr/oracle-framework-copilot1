# Snapshot: Block 3.3 Revised - Simple & Mobile-First Detail

**Time**: 2026-01-17 14:36 GMT+7
**Context**: ปรับแผน Block 3.3 จาก Modal/Intercepting Route เป็น "The Glass Sheet" ที่เน้น Mobile-First และความ Robust มากขึ้น

## 1. Simplified Architecture: "Standard Detail, Premium Transition"
- **Architecture**: เปลี่ยนจาก `@modal` intercepting route เป็น **Public Route ปกติ** (`/chicken/[id]`) เพื่อลดความเสี่ยงเรื่อง State Management และ SEO
- **UX Strategy**: ใช้ **Shared Layout** หรือ Animation ในการนำทางเพื่อให้รู้สึกเหมือนแผ่นข้อมูลสไลด์ขึ้นมา (Sheet Experience) โดยไม่ต้องพึ่งพา Folder Structure ที่ซับซ้อนเกินไป

## 2. Mobile-First Pedigree: "Vertical Bloodline"
- **Layout**: เลิกใช้ SVG Horizontal Tree (ที่มักจะล้นจอมือถือ) เปลี่ยนมาเป็น **Vertical Hierarchy**
    - ใช้ Grid 2 คอลัมน์สำหรับ พ่อ-แม่
    - ใช้ รายการย่อ (List) สำหรับ ปู่-ย่า-ตา-ยาย
    - เน้นการจัดวางที่อ่านง่ายบนแนวตั้ง (Portrait)
- **Robustness**: ใช้ CSS Grid/Flexbox ที่เสถียรกว่าการวาดเส้น SVG ในจอมือถือที่ขนาดหน้าจอหลากหลาย

## 3. Premium Identity (Glassmorphism)
- **Visual**: ใช้แผ่นกระจก `backdrop-blur-2xl` ซ้อนทับกัน (Layered Glass) เพื่อแบ่งสัดส่วนข้อมูล
- **Content**:
    - **Header**: ภาพไก่ขนาดใหญ่พร้อมข้อมูลสรุป
    - **Body**: สายเลือดแนวตั้ง (Vertical Pedigree)
    - **Footer**: Gallery และปุ่มติดต่อสอบถาม

## 4. Why this is better?
- **Simple**: พัฒนาง่าย บำรุงรักษาได้ระยะยาวโดยไม่ต้องกังวลเรื่อง Next.js Intercepting Bugs
- **Robust**: รองรับการ Refresh หน้า, การแชร์ Link และการกด Back แบบ Native
- **Mobile First**: ออกแบบมาเพื่อนิ้วโป้งและการไถหน้าจอแนวตั้งโดยเฉพาะ
- **Premium**: ความสวยงามไม่ได้อยู่ที่ Modal แต่อยู่ที่ Typography, Blur, และ Layout ที่ "หายใจสะดวก"

## Tags
`ninlanee` `block-3.3` `mobile-first` `pedigree` `simple-robust`
