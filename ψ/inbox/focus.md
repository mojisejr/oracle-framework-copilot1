## Current Focus

**State**: idle
**Task**: Completed Oracle Memory 2.0 Reorganization. Ready for next session.
**Issue**: #none
**Since**: 23:34

## States

| State | When |
|-------|------|
| `working` | กำลังทำงาน |
| `focusing` | ทำงานเชิงลึก (อย่ารบกวน) |
| `pending` | รอข้อมูล/การตัดสินใจ |
| `jumped` | เปลี่ยนหัวข้อ |
| `completed` | งานเสร็จสมบูรณ์ |
| `idle` | ไม่มีงานกำลังทำ |

## How to Update

```bash
echo "**State**: working
**Task**: [สิ่งที่กำลังทำ]
**Since**: $(date '+%H:%M')" > psi/inbox/focus.md
```
