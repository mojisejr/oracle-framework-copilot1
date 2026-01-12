# Snapshot: Referral System Audit (MMV-Tarots)

**Time**: 2026-01-12 12:25
**Context**: Deep dive into the referral link system across Profile and Share components.

## Insight

### 1. Verification of "Delayed Reward" Logic
- **Confirmation**: ใช่ครับ ตามที่โค้ดใน `referral-service.ts` และ `credit-service.ts` ระบุไว้:
    - **Referrer (คนชวน)**: จะได้ 2 stars
    - **Referee (คนถูกชวน)**: จะได้ 1 star
    - **เงื่อนไข**: ทั้งคู่จะยังไม่ได้ดาวทันทีที่สมัคร แต่จะได้ "เครดิตรอการอนุมัติ" (PENDING) และระบบจะทำการ `grantReferralReward` ให้เมื่อ **คนถูกชวน (Referee) ทำการเปิดไพ่สำเร็จครั้งแรกเท่านั้น**
- **ทำไมถึงเป็นแบบนี้?**: เพื่อป้องกันคนสมัครไอดีปลอมมาเพื่อเอาดาวไปใช้ แต่ไม่ได้ใช้งานจริง (Star-Farming) ระบบจะกรองให้แน่ใจว่ามีการใช้งานจริงเกิดขึ้นก่อนถึงจะแจกรางวัลครับ

### 2. Functional Redundancy in /profile
- ปัจจุบันในหน้า `/profile` มีการเรียก `/api/auth/referral-check` (POST) 
- ฟังก์ชันนี้จะไปเรียก `CreditService.applyReferralReward` ซึ่งสุดท้ายก็จะวนกลับไปเช็ค `referralService.processReferralSignup`
- **จุดที่พบ**: หาก User สมัครผ่านลิงก์ ระบบ `Better-Auth` จะเรียก `after create user` hook ให้โดยอัตโนมัติอยู่แล้ว การมี `/api/auth/referral-check` ในหน้า Profile จึงเป็นเสมือน "ตาข่ายดักฝุ่น" (Fallback) ในกรณีที่ Hook ทำงานผิดพลาด หรือ User สมัครทิ้งไว้แล้วเพิ่งมาคลิกลิงก์ทีหลัง

### 3. Safety & Hallucination Risks
- `ShareActions.tsx`: มีการใช้ `(session?.user as any)?.referralCode` ซึ่งไม่ปลอดภัย (Not Type-safe) และอาจเป็นจุดที่ "มโน" ว่าตัวแปรนี้จะมีค่าอยู่เสมอ
- **Integration Error**: ก่อนหน้านี้มีการ merge ผิด branch ไปยัง `main` ทำให้ Logic บางส่วนอาจจะยังไม่นิ่งใน `staging`

## Apply When
- เมื่อต้องปรับปรุงระบบความปลอดภัยของ Referral หรือเพิ่มฟีเจอร์ Referral Dashboard

## Tags
`referral-system` `audit` `anti-fraud` `mmv-tarots`
