## Current Focus

**State**: completed
**Task**: สร้างและปรับแต่ง `context-finder` custom agent ให้เป็น Native Oracle ใน GitHub Copilot
**Issue**: #none
**Since**: 14:00

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
