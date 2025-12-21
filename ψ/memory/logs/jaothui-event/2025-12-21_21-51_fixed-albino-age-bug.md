# Snapshot: Fixed Albino Age Calculation Bug

**Time**: 2025-12-21 21:51
**Context**: Fixed a critical bug in `RoyalForm.tsx` where albino buffalo age was being incorrectly calculated by subtracting a whole month instead of a day.

## Insight

1. **The Bug**: ในโค้ดเดิมมีการใช้ `setCalculatedAge(diff - 1)` สำหรับควายเผือก ซึ่งเป็นการหักออก 1 เดือนเต็ม ทำให้ควายที่มีอายุ 12 เดือนกว่า (13 เดือนตามเกณฑ์ปัดเศษ) ถูกลดเหลือ 12 เดือนพอดี และไปตกในรุ่น "10-12 เดือน"
2. **The Fix**: เปลี่ยนไปใช้ `start.subtract(1, "day")` เพื่อหักออกเพียง 1 วันตามเจตนารมณ์ของคอมเมนต์เดิม ทำให้การคำนวณเดือน (`diff`) ถูกต้องตามเกณฑ์ปัดเศษวัน
3. **Verification**: ยืนยันผ่าน Log ว่าอายุเปลี่ยนจาก 12 เป็น 13 เดือนสำหรับเคสที่ผู้ใช้แจ้งมา ทำให้ระบบเลือกช่วง "มากกว่า 12 เดือน ถึง 15 เดือน" ได้ถูกต้อง

## Remaining Issue (Point 2)

**Regex & Boundary Overlap**: 
- ฟังก์ชัน `parseAgeRanges` ยังไม่รองรับคำว่า "มากกว่า" ทำให้ช่วง "มากกว่า 12 เดือน" ถูก parse เป็น `min: 12`
- หากมีเคสที่คำนวณอายุได้ 12 เดือนเป๊ะ (ไม่มีเศษวัน) ระบบจะยังคง Match ทั้งช่วง "10-12" และ "12-15" และเลือกช่วงแรก (10-12) เสมอ
- **Recommendation**: ควรปรับ Regex ให้รองรับ "มากกว่า" เพื่อตั้ง `min` เป็น 13 ในอนาคตหากพบปัญหาซ้ำ

## Apply When

- เมื่อมีการคำนวณอายุสัตว์แยกตามสีหรือสายพันธุ์ที่มีเกณฑ์ต่างกัน
- เมื่อต้องจัดการกับระบบจัดรุ่นอัตโนมัติที่ใช้ String parsing

## Tags

`jaothui-event` `bug-fix` `albino-age` `boundary-condition` `snapshot`
