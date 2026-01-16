# Snapshot: Update .env.example for Supabase Storage

**Time**: 2026-01-16 13:24 GMT+7
**Context**: เตรียมความพร้อมสำหรับ Phase 2: Block 2.1 โดยการเพิ่ม ENV variables สำหรับ Storage

## Insight
- เพิ่ม `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY` ลงใน `.env.example`
- เพื่อให้ Client-side สามารถต่อตรงกับ Supabase Storage สำหรับการอัปโหลดรูปไก่ได้

## Apply When
- เมื่อเริ่มบล็อก 2.1 (Storage Integration)
- เมื่อคนอื่นมา Clone โปรเจกต์ จะได้รู้ว่าต้องใช้ Key ตัวไหนบ้าง

## Tags
`env` `supabase` `storage` `scaffolding`
