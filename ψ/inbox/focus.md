## Current Focus

**State**: completed
**Task**: Refactor refresh button and pull refresh mechanism
**Issue**: #52
**Since**: 22:08

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
