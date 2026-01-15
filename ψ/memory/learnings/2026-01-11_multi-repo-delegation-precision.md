---
type: learning
project: oracle
topic: multi-repo-delegation
status: distilled
last_updated: 2026-01-11
---

# Multi-Repo Delegation & Precision Warping

การทำงานในโครงสร้างโปรเจกต์แบบ Multi-repo (หนึ่ง Workspace หลาย Repository) มีความท้าทายในการมอบหมายงานให้ Remote Agents เนื่องจากเครื่องมือมาตรฐานมักจะยึดโยงกับ Root Repository เป็นหลัก

## 1. The Core Challenge
- เครื่องมือ `@cli /delegate` หรือ System-native PR Agent มักจะพยายามสร้าง Branch หรือ PR ใน Repository ที่ครอบคลุม Root Path (มักจะเป็น Framework Root)
- ในโครงสร้าง `projects/*` แต่ละโปรเจกต์มี Git Remote แยกจากกัน ทำให้เกิดความสับสนในการระบุพิกัด (Targeting)

## 2. The Solution: Issue-Based Delegation
วิธีที่มีประสิทธิภาพและแม่นยำที่สุดคือการใช้ **GitHub Issue Assignment** ใน Repository ปลายทาง:
1. **Identify**: ใช้ `git remote -v` ในโฟลเดอร์ Sub-project เพื่อระบุ Owner/Repo ที่ถูกต้อง
2. **Issue**: ใช้เครื่องมือ `github_issue_write` เปิด Issue ใน Repo นั้นโดยตรง พร้อม Mission Specification ที่ชัดเจน
3. **Assign**: ใช้ `assign_copilot_to_issue` เพื่อส่งต่อภารกิจ

## 3. Benefits of this Pattern
- **Isolation**: Agent จะทำงานใน Environment ของ Repo นั้นๆ โดยไม่ยุ่งกับ Root
- **Transparency**: ทุกคนเห็นภารกิจและความคืบหน้าผ่าน GitHub UI ของโปรเจกต์นั้นโดยตรง
- **Robustness**: ลดความเสี่ยงในการ push โค้ดผิด Repo หรือการสร้าง PR ที่ปนเปื้อน

## 4. Apply When
- เมื่อต้องทำการ Warp งานไปยังโปรเจกต์ที่อยู่ภายใต้ `projects/` และมี Git Repository เป็นของตัวเอง

---
**Oracle Learning**: ความแม่นยำในการเลือกพิกัด (Precision) สำคัญกว่าความเร็วในการสั่งการ (Speed) เมื่อทำงานในสเกลใหญ่
