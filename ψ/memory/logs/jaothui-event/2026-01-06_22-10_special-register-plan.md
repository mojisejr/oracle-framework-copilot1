# Snapshot: Special Registration Link Implementation Plan (Revised)
**Date**: 2026-01-06 22:15 GMT+7
**Project**: jaothui-event
**Status**: Planning (Revised with Targeted History Logic)

## Context
เจ้าของงานต้องการส่งลิงค์รับสมัครพิเศษสำหรับงาน "RoyalForm" (Target Event ID: `44da822e-7ec6-4e82-b530-a2ef06759f24`) ให้ผู้ที่ถูก reject สมัครใหม่ได้ โดยต้องการระบบที่ปลอดภัยและลบออกง่าย

## Updated Strategy: "Targeted History Logic"
จากการวิเคราะห์เพิ่มเติม เราพบว่าการสร้างปุ่มสมัครใหม่ในหน้า **History Card** โดยตรงจะมีความปลอดภัยสูงสุด เพราะจำกัดให้เฉพาะคนที่มีประวัติ "ถูกปฏิเสธ" ในงานนั้นๆ เท่านั้นที่เข้าถึงฟอร์มใหม่ได้

### 1. การแบ่งแยกประเภทงาน (Royal vs Normal)
- **Royal Event**: ต้องการการอนุมัติ (Approval Workflow) ดังนั้นต้องดึงสถานะ `approvementResult` มาแสดง
- **Normal Event**: ไม่ต้องการการอนุมัติ (สมัครแล้วถือว่าสำเร็จทันที) จะแสดงสถานะปกติ ไม่ต้องเช็ค Approvement

### 2. แผนการปรับปรุง Data Flow
- **Service Layer (`getAllRegisteredBy`)**:
    - เพิ่มการดึงฟิลด์ `eventType` และ `eventId` (เพื่อใช้ตรวจสอบเป้าหมาย)
    - เพิ่มการ Join ข้อมูลจากตาราง `approvment` เพื่อเอา `approvementResult` และ `comment`
- **UI Layer (`HistoryCard`)**:
    - ตรวจสอบ `event.eventType`
    - **ถ้าเป็น Royal**: แสดงสถานะการอนุมัติ (รออนุมัติ / ผ่าน / ไม่ผ่าน)
    - **ถ้าเป็น Normal**: แสดงสถานะ "การสมัครสำเร็จ" เหมือนเดิม
- **Special Action Button**:
    - แสดงปุ่ม "สมัครใหม่อีกครั้ง" เฉพาะเมื่อ:
        1. `event.eventType === "royal"`
        2. `approvementResult === false` (ถูกปฏิเสธ)
        3. `event._id === "44da822e-7ec6-4e82-b530-a2ef06759f24"` (งานเป้าหมาย)

## Modified Action Plan
- [ ] Update `getAllRegisteredBy` ใน `register-event.service.ts` ให้ดึงข้อมูลที่จำเป็นครบถ้วน
- [ ] สร้าง Disposable Route: `src/pages/public/special-register/[eventId].tsx`
- [ ] ปรับปรุง `HistoryCard.tsx` ให้รองรับการแสดงสถานะและปุ่มสมัครตามเงื่อนไข
- [ ] ใส่ Comment กำกับโค้ดส่วน "Special Hack" เพื่อให้ลบออกได้ง่ายหลังจบงาน
