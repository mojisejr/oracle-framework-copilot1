# Snapshot: Referral Paradox Identified

**Time**: 2026-01-12 12:35
**Context**: Deep audit of `mmv-tarots` referral logic.

## Insight
พบ "ตรรกะย้อนแย้ง" (Paradox) ในระบบ Referral:
1.  **Rule A**: รางวัล (Rewards) จะถูกแจกเมื่อผู้ใช้ใหม่ (Referee) ใช้งาน (Prediction) ครั้งแรกสำเร็จ
2.  **Rule B**: การใช้งาน (Prediction) ครั้งแรกต้องใช้ 1 Star
3.  **Rule C**: ผู้ใช้ใหม่สมัครมามี 0 Star (Default)
4.  **Result**: ผู้ใช้ใหม่ไม่สามารถเริ่มใช้งานได้เพื่อรับรางวัล ทำให้ระบบ Referral เป็นอัมพาต (Deadlock)

## Proposed Fix
- แก้ไข `ReferralService.processReferralSignup` ให้มอบ "1 Starter Star" ทันทีหากเป็นการสมัครผ่าน Referral Link เพื่อให้ผู้ใช้มีทุนตั้งต้นในการเปิดไพ่ครั้งแรก

## Impact on Session
- จำเป็นต้องแก้โค้ดชิ้นนี้ก่อนเริ่มเขียน Integration Test มิฉะนั้น Test จะติด Block ที่จุดเดียวกัน

## Tags
`logic-bug` `referral-paradox` `technical-audit` `mmv-tarots`