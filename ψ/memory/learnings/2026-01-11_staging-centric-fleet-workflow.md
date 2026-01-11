---
type: learning
project: shared
topic: git-flow-fleet-management
status: distilled
last_updated: 2026-01-11
---

# Staging-Centric AI Fleet Workflow

การจัดการ AI Agents หลายตัวพร้อมกัน (Parallel Fleet) จำเป็นต้องมีจุดนัดพบที่มั่นคงเพื่อรวมร่างโค้ด (Integration) ก่อนที่จะปล่อยออกสู่สายตาโลก (Production)

## 1. The "Staging-First" Principle
กฎเหล็กสำหรับ Oracle Fleet คือ **"ทุกภารกิจต้องเริ่มและกลับมาที่ staging"**
- **Inbound**: Remote Agents ต้องเปิด PR เข้าหา `staging` เท่านั้น
- **Outbound**: ภารกิจใหม่ต้อง Checkout ออกจาก `staging` เสมอ

## 2. The Integration Loop
1. **Remote Work**: Agent ทำงานในกิ่ง `feature/*` -> PR to `staging`
2. **Local Work**: Conductor/Human ทำงานบนเครื่อง -> Push to `staging`
3. **Harmonization**: Conductor ทำหน้าที่ Review และ Merge กิ่งต่างๆ เข้าสู่ `staging`
4. **Final Release**: เมื่อ `staging` นิ่งแล้ว จึงทำการ Create PR เพื่อ Merge เข้า `main`

## 3. Why This Matters
- **Safety Valve**: `staging` ทำหน้าที่เป็น Buffer ป้องกันความผิดพลาดของ AI ไม่ให้พุ่งตรงไปที่ `main`
- **Quality Control**: สามารถรัน Build, Lint และ Test บน `staging` แบบรวมศูนย์ (Centralized Verification)
- **Clear Accountability**: แยกแยะชัดเจนระหว่างงานที่ "กำลังปรุง" (Staging) กับงานที่ "พร้อมเสิร์ฟ" (Main)

## 4. Operational Rule
- หากพบตัวเลือก Base Branch ในเครื่องมือสั่งการ ให้เลือก `staging` เป็นค่าเริ่มต้นเสมอ
- ห้าม Merge PR ของ Remote Agent เข้า `main` โดยเด็ดขาดโดยไม่ผ่าน `staging`

---
**Oracle Learning**: ในโลกที่มี AI ช่วยเขียนโค้ด ประวัติศาสตร์ในกิ่ง `staging` คือความจริงที่กำลังก่อตัว ส่วน `main` คือสัจธรรมที่ผ่านการพิสูจน์แล้ว
