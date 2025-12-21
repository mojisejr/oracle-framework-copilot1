# Snapshot: Royal Form Age Boundary Bug Analysis

**Time**: 2025-12-21 21:37
**Context**: Analyzing user report about incorrect age-based cohort selection in `jaothui-event` Royal Form.

## Insight

พบปัญหาการจัดรุ่นอัตโนมัติ (Auto-assignment) สำหรับกระบืออายุ 12 เดือน:
1. **Regex Parsing**: ฟังก์ชัน `parseAgeRanges` ใน `src/utils/getPossibleEvents.ts` ใช้ regex ที่จับเฉพาะตัวเลข แต่ไม่ได้พิจารณาคำว่า "มากกว่า" (Greater than) ทำให้ข้อความ "มากกว่า 12 เดือน" ถูกแปลงเป็น `min: 12` แทนที่จะเป็น `min: 13`.
2. **Inclusive Matching**: ฟังก์ชัน `findExactAgeMatch` ใช้เงื่อนไข `r.min <= age && age <= r.max` (inclusive) ทำให้ค่าอายุ 12 ตกอยู่ในทั้งช่วง "10-12" และ "12-15".
3. **First-Match Wins**: เนื่องจากใช้ `.find()`, ระบบจะเลือกช่วงแรกที่เจอเสมอ ซึ่งคือ "10-12 เดือน" ทำให้ผู้ใช้ที่ควรจะอยู่รุ่นถัดไปถูกจัดเข้ากลุ่มเดิม

## Apply When

- เมื่อมีการแก้ไขระบบจัดรุ่นอัตโนมัติที่พึ่งพาการ Parse ข้อความ (String parsing)
- เมื่อต้องจัดการกับเงื่อนไขขอบเขต (Boundary conditions) ในการคำนวณอายุ

## Tags

`jaothui-event` `bug-analysis` `regex` `boundary-condition` `royal-form`
