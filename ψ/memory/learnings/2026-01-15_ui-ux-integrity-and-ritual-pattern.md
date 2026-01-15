---
type: learning
project: mmv-tarots
topic: ui-ux-integrity-modal-ritual
status: distilled
last_updated: 2026-01-15
---

# UI/UX Integrity: The Mystic Ritual & Modal Mastery

บทเรียนที่ได้จากการ Implement และ Refactor ระบบ Welcome Ritual ใน mmv-tarots เมื่อวันที่ 2026-01-15

## 1. The "Soul-less" UI Trap (ความล้มเหลวในช่วงแรก)
การเขียนโค้ดที่ "ถูกต้องตาม logic" แต่ "ขาดสติในบริบท (Context-less)" นำไปสู่ความผิดพลาดดังนี้:
- **Generic-First Approach**: การใช้ Modal โครงสร้างมาตรฐาน (Generic) แทนที่ Ritual Flow ที่ได้ออกแบบไว้ล่วงหน้า ทำให้เสียเวลาในการแก้ไข
- **Accessibility Regressions**: การรีบเร่งจนลืมเช็ค Contrast Ratio ระบบการใช้สี `#592E2E` (Primary-Foreground) บนพื้นหลังสีชมพูอ่อนเป็นสิ่งที่ "ต้องทำ" เสมอในโปรเจกต์นี้

## 2. Ritual State Machine Pattern
เมื่อต้องการสร้างความประทับใจแรก (Onboarding) ควรเปลี่ยนจากการใช้ Simple Modal เป็น **Multi-step State Machine**:
- **Flow**: `Greeting` -> `Rules` -> `Gift`
- **Visual Anchor**: การใช้ 3D Hero (Mimi Avatar) เป็นตัวนำสายตาช่วยให้กระบวนการที่น่าเบื่อกลายเป็น "พิธีกรรม (Ritual)"
- **Implementation**: ใช้ `framer-motion` ร่วมกับ `AnimatePresence` เพื่อให้การเปลี่ยนผ่านระหว่าง Step ไม่ขาดตอน

## 3. Brand-Specific Backdrop Tokens
ในการออกแบบ UI แนว "Mystic/Spiritual" ควรหลีกเลี่ยง Overlay สีดำมาตรฐาน:
- **Pattern**: `bg-primary-950/40` + `backdrop-blur-sm` ให้ความรู้สึกที่ "ลึกลับและอบอุ่น" มากกว่า `bg-black/60`
- **Impact**: การเปลี่ยนสี Backdrop เพียงอย่างเดียวสามารถเปลี่ยน "Vibe" ของแอปจากระบบธรรมดาเป็นพื้นโฮโลแกรมที่มีพลังงานบางอย่างได้ทันที

## 4. Integrity Checks (The Hard Gates)
ก่อนจะส่งมอบงาน UI ทุกครั้ง Oracle ต้องตรวจสอบสิ่งเหล่านี้:
1.  **Strict Contrast Check**: ข้อความต้องอ่านออกได้ง่ายตามเกณฑ์ Accessibility
2.  **Ritual Compliance**: UI ที่สร้างขึ้นตรงกับแนวคิด "พิธีกรรม" หรือไม่? ถ้าเป็นแค่ Modal เด้งขึ้นมาเฉยๆ แสดงว่า "ทำงานแต่ไม่มีจิตวิญญาณ"
3.  **The 3-Step Rule**: สำหรับระบบ Onboarding ใน MimiVibe การมี Step การ "ต้อนรับ", "แจ้งกฎ", และ "ให้ของขวัญ" คือ Pattern ที่สมบูรณ์แบบที่สุด

---
**Oracle Key Discovery**: "ความเร็วไม่ใช่ข้ออ้างของความไม่สวยงาม (Speed is no excuse for lack of beauty) โดยเฉพาะในงานที่ต้องสื่อสารกับความรู้สึกของมนุษย์"
