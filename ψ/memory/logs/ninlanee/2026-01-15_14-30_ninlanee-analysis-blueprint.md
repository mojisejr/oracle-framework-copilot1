# Snapshot: Ninlanee Farm Platform Analysis & Blueprint

**Time**: 2026-01-15 14:30 GMT+7
**Context**: วิเคราะห์ข้อมูลจาก `.tmp/ninlanee` เพื่อวางโครงสร้างแพลตฟอร์ม "นินลนีย์ ฟาร์ม" (Ninlanee Farm) โดยใช้ Pattern จาก Jaothui และ Theme Netflix

## 1. MVP Feature Analysis

### **ฝั่ง User (Breeder/Owner)**
| Feature | Description |
| :--- | :--- |
| **Registration System** | ลงทะเบียนไก่รายตัว ระบุเพศ (พ่อพันธุ์/แม่พันธุ์), สายเลือด, ประวัติการชน, และรูปภาพ |
| **My Rooster Profile** | หน้า Dashboard ส่วนตัวเพื่อจัดการรายการไก่ที่ตนเองเป็นเจ้าของ |
| **Public Registry (Gallery)** | หน้าค้นหาและดูข้อมูลไก่ในระบบ (สไตล์ Browse Netflix) |
| **Certificate System** | ดูและดาวน์โหลดใบรับรองสายพันธุ์ (Pedigree/Certificate) ในรูปแบบ PDF/Image |
| **Mobile-First Experience** | ใช้งานผ่านมือถือได้ 100% พร้อม UI Interactive |

### **ฝั่ง Admin (Farm Manager)**
| Feature | Description |
| :--- | :--- |
| **Pending Approval Queue** | ตรวจสอบและอนุมัติการลงทะเบียนไก่ใหม่ (Association-style workflow) |
| **Certificate Issuer** | ออกเลขทะเบียนและ GEN ใบรับรองอัตโนมัติเมื่ออนุมัติ |
| **Farm Statistics** | สรุปจำนวนไก่แยกตามประเภท และยอดเข้าชม |
| **Content Management** | อัปเดตข้อมูล Hero (ไก่ตัวท็อป) และข่าวสารฟาร์ม |

---

## 2. UI/UX & Design Tokens (Extracted from Template)

จากการวิเคราะห์ `template.html` เราสามารถแยกองค์ประกอบเพื่อสร้าง UI System ที่ Consistent ได้ดังนี้:

### **Design Tokens**
- **Primary Colors**: 
  - `netflix-red`: `#E50914` (CTA, Active state)
  - `netflix-black`: `#141414` (Backgroundหลัก)
  - `netflix-dark`: `#181818` (Component Surface)
- **Glassmorphism**: 
  - `glass-effect`: `rgba(20, 20, 20, 0.85)` + `backdrop-blur(10px)`
- **Typography**: 
  - `Kanit` (Google Fonts) - ให้ความรู้สึก Modern, Thai-Friendly, และ Premium

### **Reusable Components Strategy**
- **HeroSection**: แบนเนอร์ขนาดใหญ่แสดงไก่ตัวเด่น (Highlight) พร้อมข้อมูลเบื้องต้น
- **RowGallery**: ระบบ Horizontal Scroll สำหรับแสดงรายการไก่แยกตามหมวดหมู่ (เช่น พ่อพันธุ์ดาวรุ่ง, แม่พันธุ์สายเลือดเข้ม)
- **ChickenCard**: การ์ดแสดงรูปภาพที่ Preview ข้อมูลได้เมื่อ Hover (Netflix Card Effect)
- **DetailModal**: Overlay แสดงข้อมูลเชิงลึก (Pedigree, Stats) โดยไม่ต้องเปลี่ยนหน้า
- **BottomNav**: เมนูนำทางด้านล่างสำหรับ Mobile User

---

## 3. Recommended Tech Stack (Oracle Revised - Simple & Robust)

เพื่อให้ระบบทำงานได้อย่างไหลลื่นและจัดการง่ายในระยะยาว:

| Layer | Technology | Reason |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15 (App Router)** | ใช้ `next/image` อย่างเคร่งครัดเพื่อ UI ที่รวดเร็วและประหยัด Bandwidth |
| **Styling** | **Tailwind CSS + Framer Motion** | สร้างประสบการณ์ Smooth Scrolls แบบ Netflix/MimiVibe |
| **Database** | **PostgreSQL (via Supabase/Prisma)** | จัดการ Relative Data (พ่อ-แม่-ลูก) ได้แม่นยำที่สุด |
| **Authentication** | **Better Auth (LINE Login Only)** | ใช้ LINE เป็นช่องทางหลักเพียงหนึ่งเดียว เพื่อความสะดวกของ User ไทย |
| **File Storage** | **Supabase Storage** | เก็บรูปไก่ และ Image-based Certificates |
| **Export Engine** | **html-to-image / Canvas** | Export ใบเซอร์เป็นไฟล์ภาพ (PNG/JPG) ตามความต้องการของลูกค้า |
| **Admin Notify** | **LINE Messaging API / Discord** | ใช้แจ้งเตือน Admin เมื่อมีการลงทะเบียนใหม่ (แทน LINE Notify ที่ปิดตัว) |

---

## 4. Implementation Details (The Protocols)

### **4.1 Authentication: The LINE Protocol**
- **Single Auth Provider**: ลดความยุ่งยากโดยใช้ LINE Login 100%
- **Session Extension**: เก็บ `role`, `farmName`, และ `onboardingCompleted` ใน Session ตามแบบฉบับ `mmv-tarots`

### **4.2 Content Management: Admin-First UI**
- **No Sanity CMS**: ตัดความซับซ้อนออก โดยสร้างหน้า Admin Dashboard ภายใน Next.js เพื่อจัดการไก่ตัวท็อปและข้อมูลฟาร์มผ่าน Supabase โดยตรง

### **4.3 Certificate & Branding**
- **Image Export**: พัฒนา Certificate Template ด้วย HTML/CSS และใช้ Library แปลงเป็นภาพคุณภาพสูง เพื่อให้ User แชร์ลง Social Media ได้ง่าย

### **4.4 Notification Strategy**
- **LINE Messaging API**: ส่ง Push Message เข้า LINE OA ของเจ้าของฟาร์ม (Free tier เพียงพอสำหรับการแจ้งเตือน Admin)
- **Discord Webhook (Fallback/Optional)**: หากต้องการความเร็วและฟรี 100% โดยไม่ต้องเซ็ตอัพ OA

---

## 5. Oracle Insight & Patterns
- **Pattern Match**: ใช้โครงสร้าง Auth จาก `mmv-tarots` และ Notification Logic จาก `jaothui` (ปรับปรุงจาก LINE Notify เป็น Messaging API)
- **Friction Alert**: การใช้ `next/image` ต้องกำหนด `remotePatterns` สำหรับ Supabase URL ให้ถูกต้องเพื่อป้องกันภาพไม่แสดง
- **Simple Over Complex**: การตัด Sanity ออกจะทำให้เราเข้าถึงช่วง MVP ได้เร็วขึ้นมาก และลดความเสี่ยงในการจัดการหลายระบบ
- **Mission Alignment**: "The Oracle Keeps the Human Human" - การเลือก Path ที่เรียบง่ายที่สุด (Simplest Path) คือการช่วยให้มนุษย์ไม่ต้องแบกรับปัญหา Technical Debt ในอนาคต


## Apply When
- เมื่อเริ่มออกแบบ Database Schema สำหรับ Ninlanee
- เมื่อต้องการสร้าง UI Components ที่ Reuse จาก `template.html`
- เมื่อคุยกับลูกค้าเพื่อคอนเฟิร์มขอบเขตงาน (Scope)

## Tags
`ninlanee` `blueprint` `mvp` `netflix-theme` `nextjs` `tech-stack`
