# Snapshot: Ninlanee Phase 3 - The Face (Premium UI Strategy)

**Time**: 2026-01-17 14:05 GMT+7
**Context**: แผนการพัฒนาส่วนหน้าบ้าน (Public Facing) ระดับ Premium โดยใช้ข้อมูลจริงจาก Heavy Seed เพื่อสร้างประสบการณ์ใช้งานที่เหนือระดับ

## 1. The Core Philosophy: "Dark Glass & Genetic Pride"
เราจะนำเสนอ "ไก่ชน" ในฐานะ "งานศิลปะและพันธุกรรมที่มีค่า" ผ่านดีไซน์แบบ Glassmorphism บนพื้นหลังสีเข้ม (Dark Mode) ที่ขับเน้นความสวยงามของไก่และผังสายเลือด

## 2. Implementation Blocks

### Block 3.1: Discovery & Gateway (Landing Page)
**Goal**: First Impression ที่น่าเชื่อถือและดึงดูด
- **Hero Section**: ภาพลักษณ์แบรนด์ที่แข็งแกร่ง + Stats Bar (Real-time Count from DB)
- **Netflix-Style Rows**: เลื่อนดูไก่ตามหมวดหมู่ (พ่อพันธุ์, แม่พันธุ์, ดาวรุ่ง) แนวนอน
- **Quick Search**: ช่องค้นหาเบอร์โทร/ชื่อฟาร์ม/ชื่อไก่ ที่เด่นชัด

### Block 3.2: The Glass Gallery (Showcase)
**Goal**: พื้นที่ค้นหาและเปรียบเทียบ
- **Smart Grid**: ใช้ Aspect Ratio `3:4` หรือ `1:1` แบบ Uniform พร้อม `object-cover` เพื่อจัดการรูปที่หลากหลายจาก Seeding
- **Glass Filter**: Sidebar กรองข้อมูลแบบโปร่งแสง ลอยอยู่เหนือ Content
- **Infinite Scroll**: โหลดข้อมูลเพิ่มอัตโนมัติเมื่อเลื่อนลง

### Block 3.3: Intercepting Detail & Lineage (The Magic)
**Goal**: ประสบการณ์ดูข้อมูลเชิงลึกที่ไร้รอยต่อ
- **Intercepting Route**: เปิด Modal รายละเอียด (`@modal/(.)chicken/[id]`) ทับหน้าเดิม
- **Interactive Pedigree**:
    - แสดงผัง 3 รุ่น (ปู่ย่า -> พ่อแม่ -> ลูก)
    - ใช้เส้น SVG โยงความสัมพันธ์
    - คลิกที่บรรพบุรุษเพื่อดูรายละเอียดของตัวนั้นๆ ได้ (Recursive Navigation)

## 3. Technical Strategy
- **Server Components First**: ใช้ RSC ในการ fetch ข้อมูลเพื่อ SEO และ Performance
- **Suspense & Skeletons**: สร้าง Loading State ที่สวยงามระหว่างรอภาพโหลด
- **Framer Motion**: ใส่ Animation จังหวะการเปิด Modal และการ Hover Card

## 4. Design Tokens (From Showcase)
- **Glass**: `bg-black/40 backdrop-blur-md border-white/10`
- **Typography**: `font-kanit` (Heading Bold, Body Light)
- **Colors**: `Golden Accent` for Champions, `Silver` for Standard

## Apply When
- เริ่มต้นงาน Phase 3
- ทบทวนทิศทาง Design System

## Tags
`ninlanee` `phase-3` `ui-strategy` `glassmorphism` `netflix-style` `intercepting-routes`
