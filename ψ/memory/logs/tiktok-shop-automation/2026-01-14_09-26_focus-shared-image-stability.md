# Snapshot: Decision - Focus on Shared + Image Flow Stability

**Time**: 2026-01-14 09:26 GMT+7
**Context**: TikTok Shop Automation - Recovery Phase (Task B)

## Insight

เราตัดสินใจเลือกกลยุทธ์ **"Solidify the Base"** โดยการโฟกัสไปที่ความสมบูรณ์ของ `SharedHandlers` และทดสอบผ่าน `Image Flow` ให้สำเร็จ 100% ก่อนที่จะไปแตะ `Video Flow`

**ทำไมถึงเลือกทางนี้?**
1. **Validation of the Contract**: `SharedHandlers` คือหัวใจใหม่ของระบบ การทดสอบด้วยโหมดที่ซับซ้อนน้อยกว่า (Image) จะช่วยยืนยันว่า Selector และ Logic กลางทำงานได้จริง
2. **Robustness**: ลดความเสี่ยงในการงมหาบัคที่อาจเกิดขึ้นซ้อนกันระหว่างสองโหมด
3. **Incremental Success**: การทำให้ Image Flow กลับมาทำงานได้ จะเป็นชัยชนะแรกที่สร้างความมั่นใจก่อนลุยส่วนที่ยากขึ้น

## Apply When

- เมื่อมีการปรับเปลี่ยนระบบ Architecture ใหญ่ (Refactoring)
- เมื่อต้องเลือกความเร็วในการส่งมอบเทียบกับความเสถียรของระบบ
- เมื่อระบบมีระบบย่อย (Sub-systems) ที่ใช้ Logic ร่วมกัน

## Tags

`architecture` `strategy` `robustness` `refactoring`
