# Snapshot: Deep Dive into Agentic Parallelism (Consensus & Conflict Prevention)
**Timestamp**: 2026-01-10 23:05 GMT+7
**Issue**: #none
**Status**: Strategic Analysis & Framework Design

## 1. การวิเคราะห์ปัญหา: คอขวดของความขัดแย้ง (The Conflict Bottleneck)
การทำงานแบบ Parallel ใน AI มักจะล้มเหลวเพราะ:
- **File Conflict**: แก้ไขไฟล์เดียวกันพร้อมกัน (เช่น `package.json` หรือ `layout.tsx`).
- **Semantic Drift**: Agent ตัวนึงตั้งชื่อตัวแปรแบบหนึ่ง อีกตัวใช้อีกแบบ (Lack of Consensus).
- **Dependency Hell**: PR ของหน้าบ้านต้องการ API ของหลังบ้านที่ยังไม่ได้ Merge.

## 2. แนวทางแก้ปัญหา: "The Consensus Protocol"
เพื่อให้เนียนไปกับ Oracle Framework เราต้องใช้หลักการ **"Centralized Planning, Decentralized Execution"**:

### A. Phase 0: The Consensus Schema (สัญญาประชาคม)
ก่อนจะ Dispatch งาน **Local Oracle (Conductor)** ต้องสร้างไฟล์ชั่วคราวหรือ Log ที่ระบุ "พรมแดน" ของแต่ละงาน:
- **Shared Contracts**: นิยาม Types หรือ API Interface ร่วมกันใน Log.
- **File Ownership**: กำหนดชัดเจนว่า `Agent A` ห้ามยุ่งไฟล์ใน `src/api` และ `Agent B` ห้ามยุ่งไฟล์ใน `src/components`.
- **Locking System**: ระบุไฟล์ที่ห้ามทุกคนแตะ (เช่น Config หลัก) เว้นแต่มนุษย์จะทำเอง.

### B. Phase 1: Complexity-Based Delegation (การแยกงานตามความซับซ้อน)
Oracle จะประเมินด้วย Logic:
1. **Low Complexity (Sequential)**: งานเล็กๆ ทำบน local จบในตัวเดียว.
2. **High Complexity (Parallel)**: งานที่แยกโมดูลชัดเจน (เช่น CRUD Admin + UI Dashboard).
3. **High Coupling (Sequential/Hybrid)**: งานที่แก้ Logic ลึกซึ้งและกระจายไปทั่วโปรเจกต์ (ยังไม่ควรให้ Remote ทำพร้อมกัน).

### C. Phase 2: PR Dependency & Sequencing
Conductor จะสร้าง **Deployment Guide** ใน Issue หลัก:
- **PR #1 (Base)**: Schema/Types (Merge first).
- **PR #2 (Parallel)**: Backend Implementation.
- **PR #3 (Parallel)**: Frontend Implementation.
- **PR #4 (Review)**: Integration & Documentation.

## 3. การรักษาความ "เนียน" (Framework Integrity)
- **Snapshot Identity**: ทุก Remote Agent ต้องระบุใน Log ว่า "I am a delegate of Oracle Keeper (Conductor)".
- **Sync Pillar**: เมื่อ PR ถูกเปิด Local Oracle ต้องดึงข้อมูลความคืบหน้ามาอัปเดต `focus.md` และสร้าง `snapshot` ของการกระจายงาน เพื่อให้มนุษย์เห็นภาพรวม (Orchestration Visibility).

## 4. บทวิเคราะห์ (Unbiased Assessment)
**ข้อดี (Speed & Scale):**
- เพิ่ม Speed อย่างก้าวกระโดด (3-5x) ในงานประเภท Boilerplate หรือการขยายฟีเจอร์ที่ชัดเจน.
* **ความปลอดภัย**: การทำงานบน PR แยกกันทำให้ความเสี่ยงที่จะพัง Main Branch น้อยลงมาก.

**ข้อควรระวัง (The Risks):**
- **Overhead**: การสร้าง Consensus Schema อาจใช้เวลาพอๆ กับการเขียนโค้ดเองในบางงาน.
- **Loss of Nuance**: Remote Agent อาจจะไม่มี "ความรู้สึกถึงจิตวิญญาณโปรเจกต์" เท่า Local Oracle ที่อยู่กับคุณมานาน.
- **Merge Fatigue**: การรีวิว 3-4 PR พร้อมกันอาจทำให้มนุษย์ล้า (Reviewers' Bottleneck).

**Verdict**: **"ควรทำ แต่ต้องมีเงื่อนไข"**
เราควรทำระบบนี้ แต่ต้องไม่ใช่แบบ "ทำทุกอย่าง" ให้เลือกทำเฉพาะงานที่ **"Modular & Independent"** เท่านั้น และหัวใจสำคัญคือ **"The Shared Consensus"** ต้องแข็งแกร่งที่สุด

## Next Steps:
1. ปรับปรุง `.claude/agents/oracle-keeper.md` ให้มีความสามารถในบทบาท **"The Conductor"**.
2. ออกแบบ `Consensus Log Template` สำหรับการวางแผนก่อน Parallel.
3. ทดลองงานจริงแบบ 2-PR แยกส่วนกัน (เช่น API vs Docs).

---
*Oracle ไม่ใช่แค่ผู้รู้ แต่คือผู้เลือก... และการเลือกวิถีที่รวดเร็วโดยไม่เสียความเที่ยงตรง คือวิถีของ Oracle*
