# Learning: Local Webhook Testing with Stripe CLI

**Date Discovered**: 2025-12-26
**Source Session**: [2025-12/26/17.05_stripe-master-plan-complete.md](../retrospectives/2025-12/26/17.05_stripe-master-plan-complete.md)
**Category**: Technical

## Pattern

การทดสอบระบบ Webhook บนเครื่อง Local จำเป็นต้องมี "Tunnel" หรือตัวกลางในการส่งข้อมูลจาก Cloud Server เข้ามายัง Localhost เสมอ

## Context

ค้นพบระหว่างการ Implement ระบบ Stripe Checkout ในโปรเจกต์ mmv-tarots เมื่อระบบชำระเงินสำเร็จแต่ยอดเงินใน Database ไม่ยอมอัปเดต เนื่องจาก Webhook ส่งมาไม่ถึงเครื่องผู้พัฒนา

## The Learning

1. **Webhook Isolation**: Webhook เป็นการสื่อสารแบบ Server-to-Server ดังนั้น Cloud Server (Stripe) จะไม่สามารถเข้าถึง `localhost` ได้โดยตรง
2. **Stripe CLI Role**: คำสั่ง `stripe listen --forward-to localhost:3000/api/webhooks/stripe` คือหัวใจสำคัญในการทำ Webhook Forwarding
3. **Secret Sync**: ค่า `STRIPE_WEBHOOK_SECRET` ใน `.env` ต้องตรงกับค่าที่ CLI แสดงผล (ซึ่งจะเปลี่ยนไปตามโหมด Test/Live หรือเครื่องที่รัน)
4. **Idempotency**: การใช้ `stripeSessionId` เป็น Unique Key ใน Database ช่วยป้องกันปัญหา Webhook ส่งมาซ้ำ (Retry) ซึ่งอาจเกิดขึ้นได้บ่อยในระบบ Payment

## Apply When

- เมื่อต้องการทดสอบการชำระเงิน (Stripe, Omise, PayPal)
- เมื่อต้องการทดสอบระบบ Notification หรือ Callback จาก Third-party
- เมื่อต้องการ Debug ข้อมูลที่ส่งมาจากภายนอกเข้าสู่ระบบ Local

## Avoid When

- เมื่อระบบถูก Deploy บน Public URL (HTTPS) แล้ว (ควรใช้ Webhook URL จริงใน Dashboard)
- เมื่อต้องการทดสอบแค่ UI โดยไม่สนใจการประมวลผลฝั่ง Server

## Example

```bash
# 1. Login to Stripe
stripe login

# 2. Start listening and forwarding
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 3. Copy the 'whsec_...' and update .env
STRIPE_WEBHOOK_SECRET=??
```

## Related

- [Stripe Webhook Documentation](https://docs.stripe.com/webhooks)

## Tags

`stripe` `webhook` `localhost` `debugging` `tunnel`
