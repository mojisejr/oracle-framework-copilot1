# Snapshot: Ninlanee Refactor & Robustness Plan (Pre-Block 2.4/3.0)

**Time**: 2026-01-16 14:45 GMT+7
**Context**: Deep dive into `projects/ninlanee` codebase before proceeding to Block 2.4 (Admin) and Phase 3 (Marketplace).

## Insight: Friction Points & Technical Debt

จากการตรวจสอบ codebase ในปัจจุบัน พบจุดที่สามารถปรับปรุงเพื่อความ Robust และ Ready-to-Scale ได้ดังนี้:

1.  **UX Feedback Loop**:
    *   ปัจจุบันใช้ `alert()` สำหรับการแจ้งเตือน Error และไม่มีการแจ้งเตือนเมื่อสำเร็จแบบ Visual (Toast).
    *   `RegistryForm` ส่งข้อมูลเสร็จแล้วใช้ `router.push` จาก Client-side ซึ่งอาจเกิด Race Condition กับ data cache.
2.  **Server Actions Integrity**:
    *   `createChicken` ยังขาด `revalidatePath('/dashboard')` ทำให้ Dashboard ไม่ Update ทันทีแบบ Reliable.
    *   ยังไม่ได้ใช้ `redirect()` จาก Server-side (Best Practice สำหรับ Next.js 15+).
3.  **Security Gaps**:
    *   `middleware.ts` ป้องกันแค่ `/profile` และ `/admin` แต่ยังไม่ได้รวม `/dashboard` (My Farm).
4.  **UI Consistency**:
    *   ปุ่มลบไก่ (`deleteChicken`) ทำงานได้แต่ไม่มี Confirmation Dialog (ป้องกันการกดพลาด).
    *   การจัดการ Loading states ยังกระจัดกระจาย.

## Refactor Mission Blueprint

### 1. Infrastructure (Quick Win)
*   **Install**: `sonner` สำหรับระบบ Toast Notification.
*   **Setup**: ล้อม Root Layout ด้วย `<Toaster />`.

### 2. Standardized Server Actions
*   **Response Pattern**: ปรับรูปแบบ return ให้เป็นมาตรฐานเดียวกัน:
    ```typescript
    { 
      success: boolean; 
      message: string; 
      data?: any; 
      errors?: ValidationError;
    }
    ```
*   **Internal Flow**: ย้าย `revalidatePath` และ `redirect` เข้าไปใน Action (Server-controlled Flow).

### 3. UI/UX Polishing
*   **Form**: เปลี่ยนจาก `alert` เป็น `toast.success` / `toast.error`.
*   **Safety**: เพิ่ม Simple Confirmation สำหรับการ Delete.
*   **Feedback**: เพิ่ม Skeleton Loader หรือ Empty States สำหรับ My Farm Dashboard.

### 4. Middleware Alignment
*   **Matcher Update**: เพิ่ม `/dashboard/:path*` และเส้นทางที่เกี่ยวข้องกับ User Private Storage เข้าไปใน Middleware.

## Apply When
*   ก่อนเริ่มลุยระบบ **Certification (Admin View)** และ **Marketplace (Public View)** เพื่อให้ระบบฐาน (Foundation) นิ่งที่สุด.

## Tags
`refactor` `u-x` `server-actions` `security` `ninlanee`
