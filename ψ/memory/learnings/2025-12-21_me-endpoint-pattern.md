# Learning: The "/me" Endpoint Pattern in Authentication

**Date Discovered**: 2025-12-21
**Source Session**: [2025-12-21_rrr_mmv-tarots-auth-migration.md](../retrospectives/2025-12-21_rrr_mmv-tarots-auth-migration.md)
**Category**: Technical

## Pattern
การใช้ `/me` endpoint เป็นการย้ายหน้าที่การระบุตัวตน (Identity) จาก Client-side มาเป็น Server-side โดยใช้ Session Token เป็นกุญแจหลัก

## Context
เราพบปัญหา `Unauthorized` เมื่อ Client ส่ง `userId` ที่เก็บไว้ใน `localStorage` ไปให้ API เพราะ API ตรวจสอบแล้วพบว่าไม่ตรงกับ `session.user.id` ที่ล็อกอินอยู่จริง การเปลี่ยนมาใช้ `/me` ช่วยแก้ปัญหานี้และเพิ่มความปลอดภัย

## The Learning

### 1. Concept ของ "/me"
แทนที่จะให้ Client บอกว่า "ฉันคือ User A ขอข้อมูลของ User A หน่อย" (ซึ่ง Client อาจจะโกหกหรือส่ง ID ผิดได้) เราเปลี่ยนเป็นให้ Client บอกแค่ว่า "ฉันคือใครไม่รู้ แต่ฉันมีกุญแจ (Session Cookie) นี้ ขอข้อมูลของ **'ฉัน' (me)** หน่อย"

### 2. การทำงาน (Workflow)
1.  **Client**: เรียก `GET /api/predictions/me` โดยไม่ต้องส่ง ID ใดๆ ไปใน URL หรือ Body
2.  **Server**:
    *   อ่าน Session จาก Request Headers (Better Auth จะจัดการเรื่องนี้ให้)
    *   ถ้าไม่มี Session -> ตีกลับ 401 Unauthorized
    *   ถ้ามี Session -> ดึง `user.id` ออกมาจาก Session Object
    *   ใช้ `user.id` นั้นไป Query ข้อมูลใน Database
3.  **Result**: ข้อมูลที่ได้จะถูกต้องและปลอดภัยเสมอ เพราะถูกดึงมาจากแหล่งข้อมูลที่ Server เชื่อถือ (Session) เท่านั้น

### 3. ข้อดี
*   **Security**: ป้องกันการทำ Insecure Direct Object Reference (IDOR) หรือการที่ User A พยายามแอบดูข้อมูล User B โดยการเปลี่ยน ID ใน URL
*   **Simplicity**: Client ไม่ต้องจัดการเรื่องการเก็บและส่ง User ID เอง ลดความซับซ้อนของโค้ดหน้าบ้าน
*   **Consistency**: ข้อมูลจะตรงกับคนที่ล็อกอินอยู่เสมอ แม้จะมีการสลับ Account หรือ Session หมดอายุ

## Apply When
- เมื่อต้องการดึงข้อมูลส่วนตัวของผู้ใช้ที่ล็อกอินอยู่ (Profile, Settings, History)
- เมื่อต้องการความปลอดภัยสูงสุดในการเข้าถึงข้อมูลส่วนบุคคล

## Avoid When
- เมื่อต้องการดึงข้อมูลของ User คนอื่น (เช่น Admin ดูข้อมูลลูกค้า) — ในกรณีนี้ควรใช้ `/api/users/[id]` และมีการเช็ค Role แทน

## Example

```typescript
// app/api/predictions/me/route.ts
export async function GET(request: NextRequest) {
  // 1. ดึง Session จากกุญแจ (Cookie/Header)
  const session = await auth.api.getSession({ headers: request.headers });
  
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  // 2. ใช้ ID จาก Session โดยตรง (ไม่ต้องเชื่อ ID จาก Client)
  const userId = session.user.id;
  const data = await db.prediction.findMany({ where: { userIdentifier: userId } });

  return Response.json(data);
}
```

## Related
- [Better Auth Documentation](https://www.better-auth.com/)
- [OWASP: Insecure Direct Object Reference (IDOR)](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References)

## Tags
`authentication` `security` `api-design` `better-auth` `nextjs`
