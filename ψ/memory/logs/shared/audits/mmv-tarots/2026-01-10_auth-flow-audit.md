# Audit Report: mmv-tarots - Authentication Flow
**Date**: 2026-01-10
**Agent**: red (Auditor)

## Findings Summary
- [Finding 1] **Decentralized Route Protection** (Severity: Medium)
- [Finding 2] **Star-Farming via Referral Fraud** (Severity: High)
- [Finding 3] **Insecure Referral Cookie Handling** (Severity: Low)

## Detailed Analysis

### [Finding 1] Decentralized Route Protection
- **File**: [projects/mmv-tarots/middleware.ts](projects/mmv-tarots/middleware.ts)
- **Risk**: ภาระการตรวจสอบสิทธิ์อยู่ที่แต่ละ Route (Page/API) เพียงอย่างเดียว หากนักพัฒนาลืมเพิ่มการเช็ค `auth.api.getSession` ในไฟล์ใหม่ ข้อมูลอาจรั่วไหลได้ทันที เพราะ middleware ไม่ได้ทำหน้าที่เป็นกำแพงด่านหน้า
- **Proposed Fix**: แก้ไข middleware ให้ตรวจสอบ session สำหรับกลุ่ม path ที่ต้องการการปกป้อง (เช่น `/profile`, `/api/protected/*`) และ redirect/abort หากไม่มี session

### [Finding 2] Star-Farming via Referral Fraud
- **File**: [projects/mmv-tarots/lib/server/auth.ts#L44](projects/mmv-tarots/lib/server/auth.ts#L44)
- **Risk**: ระบบ Referral ให้รางวัล stars แก่ผู้แนะนำ (10 stars) และผู้ถูกแนะนำ (5 stars) ทันทีที่สร้าง User โดยไม่มีการตรวจสอบความซ้ำซ้อน (เช่น IP Address, Device Fingerprint หรือ Captcha) ผู้ประสงค์ร้ายสามารถเขียน script สร้างบัญชี LINE/dummy account จำนวนมากเพื่อปั๊ม stars ได้ไม่จำกัด
- **Proposed Fix**: 
    1. เพิ่มการเก็บ IP Address ในตาราง User หรือ Referral log
    2. จำกัดการให้รางวัล Referral ต่อ 1 IP ในช่วงเวลาหนึ่ง
    3. ชะลอการให้รางวัลจนกว่าผู้ถูกแนะนำจะมีการใช้งานจริง (เช่น ทำนายครั้งแรก)

### [Finding 3] Insecure Referral Cookie Handling
- **File**: [projects/mmv-tarots/middleware.ts#L17](projects/mmv-tarots/middleware.ts#L17)
- **Risk**: แม้จะใช้ `httpOnly: true` แต่ไม่ได้มีการระบุ `expires` ที่สั้นพอ หรือการตรวจสอบว่า `refParam` เป็นรหัสที่ถูกต้องก่อนตั้งค่าคุกกี้ (แม้จะเป็นเรื่องเล็กน้อย แต่อาจถูกใช้ในการทำ Poisoning คุกกี้ได้)
- **Proposed Fix**: ตรวจสอบ format ของ `referralCode` ก่อน `response.cookies.set` โดยใช้ Regex หรือ check เบื้องต้น

## Final Verdict
**CAUTION** - ระบบมีความเสี่ยงในเชิง **Business Logic (Referral Fraud)** สูง และมีความเสี่ยงด้าน **Operational Security** จากการที่ไม่มี Global Auth Guard ใน Middleware
