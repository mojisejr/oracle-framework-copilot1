# Snapshot: UI Theme Mismatch Discovery (Admin Dashboard)

**Time**: 2026-01-16 23:32
**Context**: ตรวจสอบความสอดคล้องของดีไซน์ (Design Consistency) ระหว่างหน้า Admin Dashboard และ Brand Identity ของ Ninlanee Farm

## Insight

พบว่าหน้า Admin Dashboard ที่เพิ่งสร้างใน Block 2.4 มีการใช้ UI สไตล์ "Standard SaaS/Light Mode" ซึ่งขัดแย้งกับ "Brand Identity" (Netflix-style Dark Mode) ของโปรเจกต์อย่างรุนแรง

**ประเด็นที่พบ:**
1. **Background Contrast**: ระบบหลักใช้พื้นหลังดำสนิท (`#141414`) แต่หน้า Admin ใช้สีเทาอ่อน (`bg-gray-50`)
2. **Component Language**: หน้า User ใช้ Glassmorphism (`backdrop-blur`, `border-white/10`) แต่ Admin ใช้ Solid White cards และ Gray borders (`border-gray-200`)
3. **Typography**: Admin ยังไม่ได้ใช้ `Kanit` font อย่างสมบูรณ์และใช้สีข้อความระดับ Contrast ของ Light-mode

## Apply When

- เมื่อต้องการย้ำเตือนเรื่องการรักษา "Design Integrity" ในทุกหน้าของโปรเจกต์ ไม่เว้นแม้แต่ระบบหลังบ้าน (Admin)
- ใช้เป็นกรณีศึกษาเรื่องการ "เผลอกลับไปใช้ค่าเริ่มต้น (Defaultism)" ของ AI เมื่อต้องการเขียนโค้ดที่เน้นฟังก์ชันการทำงานเป็นหลักจนลืมบริบททางศิลปะ

## Tags

`ninlanee` `ui-ux` `design-integrity` `theme-mismatch` `pattern-recognition`
