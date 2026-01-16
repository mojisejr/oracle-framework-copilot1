# Snapshot: Block 2.4 Admin Approval System & Security

**Time**: 2026-01-16 23:30 (Estimated)
**Context**: Completed the Admin Dashboard and Security Policy (Block 2.4).

## Insight

เราได้สร้างระบบ Admin Approval ที่เรียบง่ายแต่ทรงพลัง (Robust) โดยยึดหลัก:
1.  **Strict Authorization**: ใช้ `auth-guard.ts` เป็น Gatekeeper สำหรับทุก Admin Route และ Action
2.  **Type Safety (patched)**: ปรับแต่ง `better-auth` config ให้รับรู้ field `role` จาก Prisma Schema
3.  **Minimalist UI**: หน้า Dashboard แบบ Clean Table ที่แสดงเฉพาะข้อมูลที่จำเป็นสำหรับการตัดสินใจ (รูป, ชื่อ, เจ้าของ)

## Implementation Details

- **Protected Route**: `/admin/dashboard` (เข้าได้เฉพาะ `role='ADMIN'`)
- **Server Actions**:
    - `approveChicken`: เปลี่ยนสถานะเป็น `APPROVED`
    - `rejectChicken`: เปลี่ยนสถานะเป็น `REJECTED`
- **Component**: `ApprovalList` แยกเป็น Client Component เพื่อความลื่นไหลของ UI/UX (`useTransition`)

## Verification

- **Build**: 100% Passed.
- **Security Check**:
    - `requireAdmin` guard is applied to Admin Layout.
    - `checkAdmin` is checked inside every Server Action.

## Apply When

- ต้องการเพิ่ม Role-based Access Control (RBAC) ในโปรเจคที่ใช้ Better Auth + Prisma

## Tags

`ninlanee` `admin-system` `better-auth` `security` `rbac`
