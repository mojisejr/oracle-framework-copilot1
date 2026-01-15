# Snapshot: Starter Star System Blueprint (mmv-tarots)

**Time**: 2026-01-12 12:48
**Task**: Implementation of the "Starter Star" system to resolve the Referral Paradox.

## 1. System Design (Simple + Robust)
เราจะสร้างระบบ "ทุนตั้งต้น" ให้กับ User ทุกคนที่สมัครใหม่ เพื่อให้พวกเขาสามารถข้ามผ่านกำแพงการใช้งานครั้งแรก (Aha! Moment) ได้ทันที โดยมีการบันทึกประวัติอย่างละเอียด

### Economic Model (The Hybrid)
- **Base Onboarding Bonus**: +1 Star (สำหรับทุกคน)
- **Referral Entry Bonus**: +1 Star (รวมเป็น 2 ดาว หากสมัครผ่านลิ้งก์เพื่อน)
- **Referral Reward (Delayed)**: +2 Stars (สำหรับคนชวน เมื่อเพื่อนเปิดไพ่ครั้งแรก)

---

## 2. Technical Implementation Plan

### Phase A: Architecture & Schema
- **Prisma Schema Update**:
    - เพิ่ม `ONBOARDING` และ `REFERRAL` ใน `enum TransactionType`
- **Constants Alignment**:
    - ย้ายค่าตัวเลขโบนัสไปไว้ใน `constants/referral.ts` เพื่อความง่ายในการปรับเปลี่ยนภายหลัง

### Phase B: Service Logic (`CreditService`)
- เพิ่มฟังก์ชัน `grantStartingStars(userId, isReferred)`:
    - ใช้ `db.$transaction` เพื่อความเป็น Atomicity
    - **Transaction 1**: บันทึก `ONBOARDING Bonus` (+1) พร้อม Log
    - **Transaction 2**: บันทึก `REFERRAL Bonus` (+1) พร้อม Log (ถ้า `isReferred` เป็น true)

### Phase C: Hook Integration (`auth.ts`)
- ปรับปรุง Better Auth `user.create.after` hook:
    - ตรวจสอบว่า `referralCode` มีการใช้งานหรือไม่
    - เรียก `CreditService.grantStartingStars` ทันทีหลังจาก User ถูกสร้างขึ้น

---

## 3. Why this is Robust?
1.  **Audit Trail**: ทุกดวงดาวที่มีการเพิ่ม/ลด จะถูกบันทึกใน `credit_transactions` พร้อม `TransactionType` ที่ชัดเจน
2.  **No Hallucinated Stars**: เราไม่ใช้ Default Value ใน Schema แต่ใช้ Service Layer เพื่อคุม Logic (ป้องกันดาวผีที่ไม่มีที่มา)
3.  **Failsafe**: มี IP-based Limit กั้นอยู่ที่ `ReferralService` เพื่อป้องกันการสมัครซ้ำเพื่อปั๊มดาว

## 4. Next Step
- ลงมือทำ **Phase A (Schema Update)** และรัน Migration
- อัปเดต **Phase B & C** ตามลำดับ

## Tags
`blueprint` `starter-stars` `credit-system` `mmv-tarots`