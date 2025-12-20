## Current Focus

**State**: pending
**Task**: Waiting for user confirmation on the 5th image type for Royal Form
**Issue**: #none
**Since**: 22:48

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
