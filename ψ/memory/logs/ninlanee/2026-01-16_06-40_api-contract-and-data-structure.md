# Snapshot: Ninlanee Farm API Contract & Data Structure (Phase 1)

**Time**: 2026-01-16 06:40 GMT+7
**Context**: กำหนดโครงสร้าง API Endpoints และ Data Schema สำหรับการสื่อสารระหว่าง Frontend และ Backend ตาม Prisma Schema ล่าสุด

## 1. Global Response Format
เพื่อให้การจัดการ Error และ Data ในฝั่ง Client (Next.js) เป็นมาตรฐานเดียวกัน:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

## 2. API Endpoints & Contract

### 2.1 User & Authentication
| Method | Endpoint | Description | Payload / Structure |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/onboarding` | ตั้งค่าเบอร์โทรและชื่อฟาร์มหลัง Login ครั้งแรก | `{ farmName: string, phone: string }` |
| `GET` | `/api/auth/session` | ตรวจสอบสถานะการ Lock | `BetterAuth.Session` |

### 2.2 Chicken Management (Public & User)
| Method | Endpoint | Description | Payload / Structure |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/chickens` | ดึงรายการไก่ที่ Approved แล้ว (Netflix Rows) | `{ categoryId?: string, limit?: number }` |
| `GET` | `/api/chickens/[id]`| ดึงข้อมูลไก่รายตัวพร้อมสายเลือด (Pedigree) | `Chicken & { sire?: Chicken, dam?: Chicken, media: Media[] }` |
| `GET` | `/api/chickens/me` | ดึงรายการไก่ที่ User เป็นเจ้าของ | `Array<Chicken & { media: Media[] }>` |
| `POST` | `/api/chickens` | ลงทะเบียนไก่ใหม่ (Pending Status) | `{ name, sex, birthDate, color, categoryId, sireId?, damId?, media: string[] }` |

### 2.3 Categories & Metadata
| Method | Endpoint | Description | Payload / Structure |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | ดึงรายการหมวดหมู่ในการจัด Row | `Array<Category>` |

### 2.4 Admin Operations (Secured)
| Method | Endpoint | Description | Payload / Structure |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/pending` | รายการไก่รอการตรวจ | `Array<Chicken & { owner: User }>` |
| `PATCH`| `/api/admin/moderate/[id]`| อนุมัติ/ปฏิเสธ ไก่ | `{ status: 'APPROVED' | 'REJECTED', certNo?: string }` |
| `PATCH`| `/api/admin/certify/[id]` | เปิด Flag การดาวน์โหลดใบรับรอง | `{ isCertified: boolean }` |

## 3. Data Structure Deep-Dive (Based on Prisma)

### 3.1 Pedigree Tree Object
ในหน้า `/cert/[id]` ข้อมูลสายเลือดจะถูกส่งกลับมาในรูปแบบ Recursive หรือ Flattened ที่พร้อมทำ Tree:
```typescript
type PedigreeNode = {
  id: string;
  name: string;
  image?: string;
  sex: 'MALE' | 'FEMALE';
  sire?: PedigreeNode; // พ่อ
  dam?: PedigreeNode;  // แม่
}
```

### 3.2 Media Object
```typescript
type MediaItem = {
  url: string;
  isMain: boolean;
}
```

## 4. Implementation Strategy
- **Zod Validation**: ใช้ Zod ในการ Validate ทุก Request Body ทั้งใน API Routes และ Server Actions
- **Server Actions**: สำหรับ `POST` และ `PATCH` เราจะใช้ Server Actions เสริมความปลอดภัยและลดการเขียน API Route แบบ Manual
- **Supabase Link**: ไฟล์รูปภาพจะถูกส่งเป็น URL หลังจากผ่านขั้นตอนการ Upload เข้า Supabase Storage แล้วเท่านั้น

## Apply When
- เมื่อเริ่มเขียน `lib/api/` หรือ `app/api/` handlers
- เมื่อออกแบบ Frontend Fetching Logic (SWR หรือ React Query)
- เมื่อเขียน Zod Schemas สำหรับ Validation

## Tags
`ninlanee` `api-contract` `data-structure` `backend-design` `phase-1`
