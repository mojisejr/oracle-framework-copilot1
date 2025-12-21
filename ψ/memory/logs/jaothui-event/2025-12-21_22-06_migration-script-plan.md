# Snapshot: Migration Script Plan for Albino Age Correction

**Time**: 2025-12-21 22:06
**Context**: Planning a migration script to fix incorrectly calculated ages and cohorts for albino buffaloes in Event `44da822e-7ec6-4e82-b530-a2ef06759f24`.

## Insight

1. **The Need**: เนื่องจากบัคการคำนวณอายุควายเผือก (หักเดือนแทนหักวัน) ถูกแก้ไขแล้วในโค้ดหน้าบ้าน ข้อมูลที่ลงทะเบียนมาแล้วก่อนหน้านี้จึงไม่ถูกต้องและต้องได้รับการปรับปรุง (Migration) เพื่อความยุติธรรมในการประกวด
2. **The Strategy**: สร้าง Script ที่ดึงข้อมูลจาก Sanity มาคำนวณใหม่ด้วย Logic ที่ถูกต้อง และอัปเดตกลับเฉพาะรายการที่มีการเปลี่ยนแปลงรุ่นหรือระดับ
3. **Safety First**: Script จะต้องมีโหมด Dry Run เพื่อแสดงผลลัพธ์ก่อนการบันทึกจริง และทำงานเฉพาะเจาะจงกับ Event ID ที่ระบุเท่านั้น

## Migration Steps

1. Load Event Metadata (Deadline)
2. Fetch all Albino registrations for the event
3. Re-calculate age using `start.subtract(1, "day")`
4. Re-assign cohort using `getEventTypesWithAutoAssignment` logic
5. Compare and Patch changes back to Sanity

## Apply When

- เมื่อมีการแก้ไข Logic การคำนวณที่ส่งผลกระทบต่อข้อมูลเดิมในฐานข้อมูล
- เมื่อต้องการทำ Data Cleanup/Migration ใน Sanity

## Tags

`jaothui-event` `migration-plan` `data-cleanup` `sanity` `albino-age`
