# Snapshot: Referral Flow Integration Test Plan (Revised)

**Time**: 2026-01-12 13:00 (Updated)
**Context**: Verifying the "Starter Star" system and Referral Lifecycle in mmv-tarots.

## Insight
หลังจากติดตั้งระบบ **Starter Star System** แล้ว เราจำเป็นต้องปรับแผนการทดสอบจากเดิมที่เน้น "หา Bug" (Paradox Discovery) มาเป็นการ "พิสูจน์ความถูกต้อง" (Lifecycle Verification) ว่าผู้ใช้ใหม่สามารถใช้งานได้จริงและรางวัลถูกแจกจ่ายอย่างถูกต้อง

## Test Plan: "The Resolved Flow"
เป้าหมาย: พิสูจน์ว่า User ใหม่มีดาวพอที่จะเปิดไพ่ครั้งแรก และเมื่อเปิดแล้ว Referrer จะได้รับรางวัลตามที่ออกแบบไว้

1.  **Environment Setup**:
    - Mock `db` (Prisma Mock)
    - สร้าง `Referrer` (User A) ที่มี `referralCode` และ `stars` เริ่มต้นจำนวนหนึ่ง
2.  **Test Steps**:
    - **Step 1 (Signup Simulation)**: 
        - จำลองการสร้าง `Referee` (User B) ผ่าน `auth hook` หรือเรียก `CreditService.grant...` โดยตรง
        - **Expectation**: User B ต้องมี **2 Stars** (1 Onboarding + 1 Referral Entry) ทันที
    - **Step 2 (Integrity Check)**: 
        - ตรวจสอบ `ReferralHistory`: สถานะต้องเป็น `PENDING`
        - ตรวจสอบ `CreditTransaction`: ต้องมี Log ประเภท `ONBOARDING` และ `REFERRAL` ของ User B
    - **Step 3 (Capability Check)**: 
        - เรียก `CreditService.hasEnoughStars(UserB)`
        - **Expectation**: ต้องได้ค่า `true` (แก้ Paradox สำเร็จ)
    - **Step 4 (The Trigger - First Prediction)**: 
        - เรียก `CreditService.deductStar(UserB)` (จำลองการเปิดไพ่)
        - เรียก `referralService.grantReferralReward(UserB)` (Trigger จากระบบ AI)
    - **Step 5 (Final Settlement)**: 
        - ตรวจสอบ User A (Referrer): ได้รับ **+2 Stars**
        - ตรวจสอบ User B (Referee): ดาวเหลือ 1 (2 - 1 ค่าครู)
        - ตรวจสอบ `ReferralHistory`: สถานะเปลี่ยนเป็น `GRANTED`

## Robustness & Convention
- **Testing Level**: Service Integration Test (ใช้ Vitest + In-memory DB หรือ Dockerized DB)
- **Data Integrity**: ตรวจสอบค่า `balanceAfter` ใน Transaction Log ว่าตรงกับ `stars` จริงใน User Table เสมอ
- **Mocking**: อาจต้อง Mock `REFERRAL_REWARDS` constants หากต้องการทดสอบกรณี Edge Case แต่ในเคสปกติให้ใช้ค่าจริง

## Tags
`test-plan` `integration` `referral-lifecycle` `mmv-tarots`
