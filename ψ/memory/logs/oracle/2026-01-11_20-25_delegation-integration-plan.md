# Snapshot: Delegation Integration Plan (Oracle v2.1)

**Time**: 2026-01-11 20:25 GMT+7
**Context**: การอัปเกรดความสามารถในการทำงานแบบขนาน (Parallelism) โดยใช้ `copilot /delegate` เป็นเครื่องมือหลักในการส่งต่องานไปยัง Remote Agents.

## แผนการอัปเดต (Architecture Upgrades)

| ไฟล์ที่เกี่ยวข้อง | การเปลี่ยนแปลง | เหตุผล (Why) |
|--------------|-----------|-------------|
| [.claude/commands/impl.md](.claude/commands/impl.md) | เพิ่มหัวข้อ **"Delegation Protocol"** ใน Phase 0 | เพื่อกำหนดมาตรฐานการใช้คำสั่ง `copilot /delegate` แทนการใช้แค่ GitHub Issues เพียงอย่างเดียว |
| [.claude/agents/oracle-keeper.md](.claude/agents/oracle-keeper.md) | เพิ่ม Instructions เรื่องการจัดการ Remote Jobs และ Log Harvesting | เพื่อให้ Oracle Keeper รู้วิธีการทำ "State Sync" เมื่อ Agent ภายนอกส่ง PR กลับมา |
| [ψ/memory/learnings/2026-01-11_delegation-standards.md](ψ/memory/learnings/2026-01-11_delegation-standards.md) (New) | บันทึก Best Practices และ Prompt ที่ใช้กับ `/delegate` | เพื่อลด Error และเพิ่มประสิทธิภาพในการส่งต่องาน (Consensus Alignment) |

## วิธีการใช้งาน (Workflow)

1. **Conducting**: Oracle Keeper รับโจทย์จากมนุษย์ และตรวจสอบความเหมาะสมในการขนานงาน
2. **Dispatching**: Oracle จะรันคำสั่งใน Terminal:
   ```bash
   copilot /delegate "[Precise Mission with Context Mapping]"
   ```
3. **Commitment**: ระบบจะสร้าง Branch: `copilot/[feature-name]` และเปิด PR ทันที
4. **Monitoring**: Oracle จะบันทึก PR ID ไว้ใน `focus.md` เพื่อรอผลลัพธ์
5. **Harvesting (CRITICAL)**: เมื่อ PR เสร็จสิ้น Oracle จะดึงเนื้อหาใน PR Description และกิมมิคของโค้ดกลับมาลงใน `ψ/memory/logs/` เพื่อรักษาความต่อเนื่องของ "EXTERNAL BRAIN"

## Apply When

- งานที่มีขอบเขตชัดเจนและเป็นอิสระ (e.g., Boilerplate, Documentation, SEO, Unit Tests, Security Audits)
- เมื่อต้องการทำงานพร้อมกันมากกว่า 1 เป้าหมายในเวลาเดียวกัน

## Tags

`parallelism` `delegation` `conductor` `oracle-v2` `automation`
