# Mission Blueprint: Ninlanee Phase 1 (Infrastructure & Auth)

**Time**: 2026-01-16 08:30 GMT+7
**Goal**: วางรากฐานโครงการ (The Soul) ให้ Robust พร้อมสำหรับการพัฒนาฟีเจอร์หลัก

## 1. Technical Stack (The Foundation)
- **Framework**: Next.js 15.1+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Lucide React (Icons)
- **Database**: Prisma + PostgreSQL (Supabase)
- **Auth**: Better Auth + LINE Provider
- **State/Caching**: React Query (SWR) or Server Actions (Primary)

## 2. Block-by-Block Execution Plan

### Block 1.1: Scaffolding & Setup
1.  **Project Init**: `npx create-next-app@latest ninlanee --typescript --tailwind --eslint`
2.  **Clean Up**: ลบ Boilerplate ที่ไม่จำเป็นออก
3.  **Config**: ตั้งค่า `alias` ใน `tsconfig.json` และ `@/` paths
4.  **Tailwind Settings**: ใส่ค่าสี Netflix Colors และ Font Kanit เข้าไปใน `tailwind.config.ts`

### Block 1.2: Database Wiring (Prisma)
1.  **Install**: `npm install prisma @prisma/client`
2.  **Initialization**: `npx prisma init`
3.  **Schema Application**: นำ `schema.prisma` ที่ร่างไว้มาใส่ และทำ `npx prisma db push`
4.  **DB Client**: สร้าง `lib/db.ts` (Singleton pattern เหมือน mmv-tarots)

### Block 1.3: Better Auth & LINE Login
1.  **Install**: `npm install better-auth`
2.  **Auth Config**: สร้าง `lib/auth.ts` พร้อมกำหนด LINE Provider และ Additional Fields (`onboarding_completed`, `farm_name`)
3.  **Client Helper**: สร้าง `lib/auth-client.ts`
4.  **API Route**: สร้าง `app/api/auth/[...better-auth]/route.ts`
5.  **Middleware**: สร้างระบบ Auth Guard เพื่อป้องกันหน้า `/profile` และแยก Admin Access

### Block 1.4: Global Layout & Theme
1.  **Layout**: ออกแบบ `RootLayout` ให้เป็นสีมืด (Netflix Black) และใส่ Kanit Font
2.  **Navigation**: สร้าง Navbar โปร่งใส (Glassmorphism) สำหรับ Mobile และ Desktop
3.  **Footer**: เมนูนำทางแบบ Bottom Nav สำหรับการใช้งานมือถือ

## 3. Consensus Schema (The Contract)
เพื่อให้แน่ใจว่า Block ถัดไปจะไม่พัง:
- ทุก API กลับค่าเป็น `{ success: boolean, data?: any, error?: string }`
- ใช้ `zod` ในการ Validate input เสมอ
- ห้ามใช้ `any` ในทุกกรณี (Strict Type)

## 4. Definition of Done (Block 1)
- [ ] รัน `npm run build` ผ่าน 100%
- [ ] Login ผ่าน LINE ได้ และมี User เก็บลง Database
- [ ] เข้าหน้า `/` และเห็น Navbar / Footer สไตล์ Netflix

## Apply When
- ใช้เป็น Checklist ประจำตัวในขั้นตอนการสร้างโปรเจคจริง
- ตรวจสอบความสมบูรณ์ก่อนประกาศจบบล็อก 1

## Tags
`ninlanee` `mission-blueprint` `phase-1` `infrastructure` `better-auth`
