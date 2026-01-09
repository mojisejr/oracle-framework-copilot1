# Learning: Robust Metadata Markers ([SP]) & Watcher Loop Protection

**Date Discovered**: 2026-01-09
**Source Session**: [2026-01-09_16.56_implement-manual-selection.md](../retrospectives/2026-01/09/16.56_implement-manual-selection.md)
**Category**: Technical

## Pattern

ใช้ "Technical Marker" (เช่น `[SP]`) ใน Metadata ของ CMS เพื่อควบคุม Logic การตัดสินใจ (Logic Branching) ในโค้ด โดยต้องมีการทำ **Stripping** (ลบออก) ในชั้นการแสดงผลและชั้นการบันทึกข้อมูล พร้อมป้องกัน Stateful loops ด้วยการตรวจสอบประเภทของ Event ใน Form watchers.

## Context

ค้นพบในเซสชันการสร้าง "โหมดสมัครรุ่นพิเศษ" (Manual Registration) ในโปรเจกต์ `jaothui-event` ซึ่งเดิมระบบใช้อายุควายที่คำนวณจากวันเกิดเป็นตัวตัดสินรุ่นที่จะสมัครโดยอัตโนมัติ แต่ Admin ต้องการเพิ่มรุ่นที่ไม่เกี่ยวกับอายุ (เช่น แคระ, แม่ลูก) โดยใช้ชื่อรุ่นเป็นตัวตัดสินแทน

## The Learning

1.  **Metadata Branching**: แทนที่จะเพิ่มฟิลด์ใหม่ใน Schema ของ CMS เราสามารถใช้ Tag พิเศษหน้า Label เพื่อเป็น Flag ให้โค้ดรู้ว่ารุ่นนี้ห้ามใช้ Logic อายุคำนวณ (เช่น `[SP] ควายแคระ`)
2.  **The Stripping Trident**: ข้อมูลที่มี Technical Marker ต้องถูกลบทิ้งที่ 3 จุด:
    - **Selection dropdown**: เพื่อให้ User เห็นชื่อรุ่นที่สะอาด
    - **Current Selection Status**: เพื่อยืนยันความถูกต้องให้ User
    - **Database Submission**: ป้องกันข้อมูลขยะรั่วไหลลงฐานข้อมูลจริง
3.  **Watcher Loop Protection**: เมื่อใช้ `react-hook-form` และมีการใช้ `watch()` ที่ส่งผลต่อ UI State (เช่น `isManualMode`) การเรียก `setValue` โปรแกรมมิ่งจะ trigger watcher อีกครั้งจนเกิด Loop การป้องกันคือ:
    - **Scope Specificity**: ระบุชื่อฟิลด์ใน `watch(['field'])` แทนที่จะดูทั้งฟอร์ม
    - **Interaction Filtering**: ตรวจสอบ `if (info.type === 'change')` เพื่อให้มั่นใจว่า Logic จะพ่นออกมาเฉพาะเมื่อคนเป็นคนพิมพ์เท่านั้น

## Apply When

- ต้องการฟีเจอร์ "Override" บนระบบ Auto-detection ที่มีอยู่เดิม
- ข้อมูลใน CMS ไม่เอื้ออำนวยต่อการทำ Grouping แต่ไม่อยากแก้ Schema ใหญ่
- ฟอร์มมีความซับซ้อนสูงและมี Side-effects มากมายที่กระทบ State ของกันและกัน

## Avoid When

- ระบบที่มีรุ่นข้อมูลจำนวนมาก (Marker จะบริหารจัดการยากกว่าการใช้ Database Category)

## Example

```tsx
// 1. Scoped Watcher with Interaction Filter
useEffect(() => {
  const subscription = watch((value, { name, type }) => {
    // Watch only date change by user, not programmatic reset
    if ((name === 'buffaloBirthDate') && type === 'change') {
      setIsManualMode(false); // Reset to auto mode on date change
    }
  });
  return () => subscription.unsubscribe();
}, [watch]);

// 2. Data Sanitization before submission
const onSubmit = (data) => {
  const payload = {
    ...data,
    competitionType: data.competitionType.replace("[SP]", "").trim(),
  };
  registerEvent(payload);
};
```

## Related

- [2025-12-28_universal-oracle-coding-standard.md](2025-12-28_universal-oracle-coding-standard.md)

## Tags

`react-hook-form` `clean-code` `metadata` `logic-branching` `state-management`
