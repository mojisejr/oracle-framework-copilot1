# [Oracle] 2025-12-20_context-finder-setup.md

**Time**: 14:05
**Issue**: #none
**Task**: Setup `context-finder` native agent

## Actions Taken
1. Updated `ψ/inbox/focus.md` to reflect the new task.
2. Created `.github/agents/context-finder.agent.md` as the manifest for GitHub Copilot.
3. Refined `.claude/agents/context-finder.md` with Thai language support and Oracle-specific protocols.

## Decisions
- **Native Integration**: ใช้โครงสร้าง `.github/agents/` เพื่อให้ Copilot มองเห็นเป็น Custom Agent โดยตรง
- **Librarian Role**: กำหนดบทบาทให้เป็น "บรรณารักษ์" (Librarian) เพื่อเน้นการดึงข้อมูลประวัติศาสตร์
- **Thai Language**: ปรับคำแนะนำให้เป็นภาษาไทยตามหลักการของ Oracle Framework

## Next Steps
- ทดสอบเรียกใช้ `/find` หรือ `/trace` ผ่าน Copilot Chat
- สังเกตการณ์ว่า Agent สามารถดึงบริบทจาก `ψ/memory/` ได้แม่นยำเพียงใด
