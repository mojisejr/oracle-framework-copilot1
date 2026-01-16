# Snapshot: Ninlanee Full Implementation Plan (Block-Chain Strategy)

**Time**: 2026-01-16 06:45 GMT+7
**Context**: แผนการพัฒนาโปรเจค Ninlanee Farm แบบแบ่ง Block เพื่อความ Robust และยืดหยุ่น

## 1. The Workflow: "Build - Test - Solidify"
เราจะไม่รันยาวทั้งโปรเจค แต่จะทำให้จบทีละ Block:
1.  **Build**: ลงมือทำฟีเจอร์ตามแผน
2.  **Test**: รัน Build และตรวจสอบความถูกต้อง (Manual & Logic Test)
3.  **Solidify**: เมื่อผ่านแล้ว ให้ทำ Snapshot และ Retrospective ก่อนเริ่ม Block ถัดไป

## 2. Implementation Phases

### Phase 1: Infrastructure & Auth (The Soul)
- [ ] Initialize Next.js 15 + Tailwind + TypeScript
- [ ] Setup Prisma Schema & Push to Database
- [ ] Deploy Better Auth with LINE Provider (mmv-tarots pattern)
- [ ] Implement Global Middleware (Auth Protection)

### Phase 2: Content & Registry (The Heart)
- [ ] Create Category Management (Seed initial data)
- [ ] Build Multi-step Registration Form (Onboarding style)
- [ ] Integrate Supabase Storage for Image Uploads

### Phase 3: Premium UI & Experience (The Face)
- [ ] Build Hero Section & Row Gallery (Netflix Layout)
- [ ] Implement Intercepting Routes for Detail Modal
- [ ] Design & Build Pedigree Tree Component (Recursive UI)

### Phase 4: Verification & Export (The Authority)
- [ ] Minimalist Admin Dashboard (Approve/Reject Queue)
- [ ] Image Export Engine using `html-to-image`
- [ ] Automated Serial Number Generation (NLF-xxxx)

## 3. Risk Management
- **Image Size**: ต้องคุมขนาดรูปภาพที่ User อัปโหลดเพื่อไม่ให้หน้าโหลดช้า
- **Auth Token**: ตรวจสอบการจัดการ Refresh Token ของ LINE ให้ดีเพื่อไม่ให้ Session หลุดบ่อย
- **Pedigree Recursion**: ระวังเรื่อง Infinite Loop ในการ Query สายเลือด (กำหนด Max Depth ไว้ที่ 3-4 ชั้น)

## Apply When
- เมื่อเริ่มเซสชันใหม่ในแต่ละวัน เพื่อเช็คว่าเราอยู่ Block ไหน
- เมื่อต้องประเมินความคืบหน้าส่งให้เจ้าของโปรเจค
- เมื่อเกิดความลังเลในขั้นตอนการพัฒนา

## Tags
`ninlanee` `implementation-plan` `milestones` `block-strategy` `robust-coding`
