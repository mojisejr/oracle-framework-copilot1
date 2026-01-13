# Snapshot: Fix Naming Collision & Global Scope Integrity

**Time**: 2026-01-13 21:30
**Context**: Fixing `SyntaxError: Identifier 'UPLOAD_STATE_KEY' has already been declared` encountered during E2E testing of the refactored TikTok Automation extension.

## Insight

ปัญหาเกิดจากโครงสร้างการโหลด Content Scripts แบบ Flatten ใน Chrome Extension (MV3) ซึ่งแชร์ Global Namespace เดียวกัน การแยก Service เป็นไฟล์ย่อยทำให้ตัวแปร `const` ที่ชื่อเหมือนกันเกิดการชนกัน (Collision) 

## Proposed Fix Plan

### 1. Centralize Storage Keys (Schema/Constants)
ย้ายการกำหนด Storage Key ทั้งหมดไปไว้ที่ `core/schema.js` เพื่อให้เป็น Single Source of Truth และป้องกันการตั้งชื่อซ้ำในอนาคต

- `IMAGE_UPLOAD_STATE_KEY = 'googleFlow_imageUploadState'`
- `VIDEO_UPLOAD_STATE_KEY = 'googleFlow_videoUploadState'`
- `BASE_UPLOAD_STATE_KEY = 'googleFlow_uploadState'` (สำหรับส่วนกลาง)

### 2. Service-Level Namespacing
ปรับปรุง `ImageService` และ `VideoService` ให้ใช้ค่าจาก Schema แทนการประกาศตัวแปร `const` ลอยๆ ในไฟล์

### 3. Cleanup `flow-content-script.js`
ลบการประกาศตัวแปรที่ซ้ำซ้อนออกจากไฟล์หลัก และใช้ Helper ฟังก์ชันที่ชื่อไม่ชนกัน

## Implementation Steps

| Step | Target File | Action |
| :--- | :--- | :--- |
| **1** | `core/schema.js` | เพิ่ม `STORAGE_KEYS` object และ export ออกมา |
| **2** | `services/image-gen.js` | ลบ `const UPLOAD_STATE_KEY` และเปลี่ยนมาใช้ `window.FlowSchema.STORAGE_KEYS.IMAGE` |
| **3** | `services/video-gen.js` | (ตรวจสอบ) และเปลี่ยนมาใช้ `window.FlowSchema.STORAGE_KEYS.VIDEO` |
| **4** | `flow-content-script.js` | ลบ `const UPLOAD_STATE_KEY` และเปลี่ยนมาใช้ `window.FlowSchema.STORAGE_KEYS.BASE` |

## Apply When

- เมื่อมีการเพิ่ม Service ใหม่และต้องการใช้ `sessionStorage` หรือ `localStorage`
- เมื่อต้องการหลีกเลี่ยง `SyntaxError` จากการโหลดหลายไฟล์ใน Content Script

## Tags

`bug-fix` `architecture` `namespacing` `chrome-extension`
