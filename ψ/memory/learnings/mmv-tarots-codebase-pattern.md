---
type: learning
project: mmv-tarots
topic: codebase-design-patterns-and-conventions
status: distilled
---

# Learning: mmv-tarots Codebase Design Patterns & Conventions

เอกสารนี้สรุปมาตรฐานการเขียนโค้ด (Coding Standards), รูปแบบการออกแบบ (Design Patterns) และโทเค็น (Tokens) ที่ใช้ในโปรเจค **mmv-tarots** เพื่อใช้เป็นแนวทางในการพัฒนาและรักษาความต่อเนื่องของ Codebase

## 1. UI & Design Pattern: "MimiVibe Glassmorphism"

โปรเจคนี้ใช้สไตล์การออกแบบที่เรียกว่า **MimiVibe** ซึ่งเน้นความโปร่งใสและนุ่มนวล

### **Visual Tokens (Tailwind Config)**
- **Colors**:
  - `primary`: Coral/Red (#F27669) - ใช้สำหรับปุ่มหลักและจุดเน้น
  - `accent`: Gold/Yellow (#FCBD74) - ใช้สำหรับองค์ประกอบที่ต้องการความหรูหรา/ไพ่ทาโรต์
  - `success`: LINE Green (#06C755) - ใช้สำหรับปุ่ม Login และสถานะสำเร็จ
  - `glass`: โปร่งใส (rgba 255, 255, 255, 0.1) พร้อม `backdrop-blur`
- **Typography**:
  - `font-sans`: **Montserrat** - ใช้สำหรับเนื้อหาทั่วไปและ UI
  - `font-serif`: **Merriweather** - ใช้สำหรับหัวข้อ (Headings) เพื่อความขลัง
- **Animations**:
  - `fade-in-up`: ใช้สำหรับเนื้อหาที่ค่อยๆ ปรากฏขึ้น
  - `float-slow`: ใช้สำหรับ MimiAvatar หรือองค์ประกอบที่ลอยอยู่
  - `shimmer`: ใช้สำหรับ Effect บนปุ่มเมื่อ Hover

### **Component Patterns**
- **Atomic-ish Structure**: แยก `components/ui` (พื้นฐาน) ออกจาก `components/features` (เฉพาะทาง)
- **Glass Components**: ทุก UI หลักต้องใช้ `GlassCard` หรือ `GlassButton` เพื่อรักษาความโปร่งใส
- **CVA (Class Variance Authority)**: ใช้จัดการ Variants ของ Component (เช่น `buttonVariants`)

---

## 2. Architecture & Logic Patterns

### **Server-Side: Service Layer Pattern**
- **Location**: `services/`
- **Pattern**: แยก Business Logic ออกจาก API Routes โดยใช้ Service Objects (เช่น `PredictionService`)
- **Database**: ใช้ Prisma (`lib/server/db.ts`) เป็น ORM หลัก

### **Client-Side: API Wrapper & Validation**
- **Location**: `lib/client/api.ts`
- **Pattern**: ใช้ `fetch` ครอบด้วยฟังก์ชันที่ระบุ Type ชัดเจน
- **Validation**: ใช้ **Zod** ในการ Parse และ Validate ข้อมูลที่รับมาจาก API ทั้งขาเข้าและขาออก
- **Error Handling**: มี Custom Error เช่น `AuthError` เพื่อแยกแยะปัญหาด้านสิทธิ์การเข้าถึง

### **State Management: Context Provider Pattern**
- **Location**: `lib/client/providers/`
- **Pattern**: ใช้ React Context สำหรับ Global State ที่ไม่ซับซ้อนมาก (เช่น `NavigationProvider` จัดการ `isLoggedIn`, `currentPage`)

---

## 3. Coding Conventions

- **File Naming**:
  - Components: `kebab-case.tsx` (เช่น `question-input.tsx`)
  - Utilities/Services: `kebab-case.ts` (เช่น `prediction-service.ts`)
- **TypeScript**:
  - บังคับใช้ Interface/Type สำหรับ Props และ API Responses
  - หลีกเลี่ยงการใช้ `any` (ยกเว้นใน `reading-utils.ts` ที่ต้องรองรับข้อมูลยืดหยุ่นจาก AI)
- **Imports**:
  - ใช้ Path Alias `@/` เสมอ (เช่น `@/components`, `@/lib/client/api`)
  - จัดกลุ่ม Import: React -> Next.js -> Third-party -> Internal Components -> Internal Libs

---

## 4. Summary Wording (The Pattern Name)

รูปแบบการเขียนโค้ดของโปรเจคนี้เรียกว่า:
> **"MimiVibe: Type-Safe Glassmorphism with Service-Oriented Architecture"**

หรือเรียกสั้นๆ ว่า **"MimiVibe Pattern"**

---
**Oracle Note**: การยึดถือ Pattern นี้จะช่วยให้ AI และมนุษย์ทำงานสอดประสานกันได้โดยไม่เกิดความสับสนในโครงสร้าง (Structural Integrity)
