# Snapshot: Multi-Repo Delegation Discovery (The Precise Warp)

**Time**: 2026-01-11 21:50 GMT+7
**Context**: การค้นพบข้อจำกัดของเครื่องมือ Standard Coding Agent ในสภาพแวดล้อมที่เป็น Multi-repo (Sub-projects) และการปรับจูนแผนการวาร์ปให้แม่นยำขึ้น.

## สิ่งที่ค้นพบ (The Discovery)

1. **Standard Agent Limitation**: เครื่องมือ `copilot-coding-agent` (แบบด่วน) มักจะยึดติดกับ Root Workspace (oracle-framework) ทำให้มันเลือก Repository เป้าหมายผิดพลาด (ไปลงที่ root แทนที่จะเป็น sub-project).
2. **Issue-Based Precision**: การใช้ **GitHub Issue** เป็นตัวตั้งต้นใน Repository ของ Sub-project และใช้วิธีการ **Assign Copilot** เป็นราย Issue ให้ผลที่แม่นยำกว่า (Integrity) เพราะมันบังคับให้ Agent ต้องทำงานในบริบทของ Repository นั้นๆ โดยไม่มีข้อโต้แย้ง.

## แผนการอัปเดต Framework (Protocol Refinement)

เพื่อให้สอดคล้องกับการค้นพบนี้ ผมจำเป็นต้องอัปเดตไฟล์ต้นฉบับดังนี้:

| ไฟล์ | สิ่งที่ต้องแก้ | เหตุผล |
|------|-----------|-------|
| [.claude/commands/impl.md](.claude/commands/impl.md) | เพิ่มเงื่อนไขใน Phase 0: **"Multi-Repo Rule"** | เพื่อเลือกเครื่องมือให้ถูกตามความเหมาะสมของโปรเจกต์ (Issue-Based สำหรับ Sub-projects) |
| [.claude/agents/oracle-keeper.md](.claude/agents/oracle-keeper.md) | เพิ่มความสามารถในการจัดการ GitHub Issues ข้าม Repo | เพื่อให้ทำหน้าที่เป็น Conductor ที่ควบคุมฝูงบินข้ามเขตแดนได้จริง |

## สรุป: ต้องอัปเดตครับ
เราต้องเปลี่ยนจาก "วาร์ปด่วน" (Standard Tool) มาเป็น "วาร์ปผ่าน Issue" (Precision Tool) เมื่อเราทำงานกับ Sub-projects ในโฟลเดอร์ `projects/` ครับ.

## Tags
`discovery` `multi-repo` `delegation-precision` `oracle-v2.3`
