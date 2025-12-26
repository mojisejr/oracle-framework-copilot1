# Learning: Stripe Dashboard Setup Guide for mmv-tarots
**Timestamp**: 2025-12-26 15:45 GMT+7
**Project**: mmv-tarots
**Topic**: stripe-dashboard-configuration

เอกสารนี้สรุปขั้นตอนการตั้งค่าบน Stripe Dashboard เพื่อรองรับระบบชำระเงินด้วยบัตรเครดิตและ PromptPay สำหรับโปรเจค mmv-tarots

## 1. การตั้งค่า Payment Methods
เพื่อให้ User สามารถชำระเงินผ่าน PromptPay และบัตรได้ ต้องไปเปิดใช้งานก่อน:
1. เข้าไปที่ **Settings > Payment methods**
2. เลือก Configuration ที่ต้องการ (ปกติคือ Default)
3. ตรวจสอบว่า **Cards** และ **PromptPay** ถูกตั้งค่าเป็น **Active**
   - *หมายเหตุ*: PromptPay ในไทยอาจต้องใช้เวลา Verify ตัวตนของบัญชี Stripe ก่อนถึงจะเปิดใช้งานได้

## 2. การตั้งค่า Branding & Checkout
เพื่อให้หน้า Stripe Checkout ดูเป็นส่วนหนึ่งของ mmv-tarots:
1. เข้าไปที่ **Settings > Branding**
2. อัปโหลด Logo และตั้งค่า Accent Color (แนะนำให้ใช้สี `#F27669` ตาม MimiVibe Pattern)
3. เข้าไปที่ **Settings > Checkout settings**
4. ตรวจสอบว่าเปิดใช้งานฟีเจอร์ที่จำเป็น เช่น "Allow promotion codes" (ถ้าต้องการ)

## 3. การเตรียม API Keys
สำหรับการพัฒนาและทดสอบ (Test Mode):
1. เปิดสวิตช์ **Test mode** ที่มุมขวาบนของ Dashboard
2. เข้าไปที่ **Developers > API keys**
3. คัดลอก **Publishable key** และ **Secret key** ไปใส่ใน `.env`

## 4. การตั้งค่า Webhooks
### สำหรับการทดสอบในเครื่อง (Local Development)
1. ติดตั้ง [Stripe CLI](https://docs.stripe.com/stripe-cli)
2. รันคำสั่ง: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. คัดลอก `whsec_...` (Webhook Signing Secret) ที่ปรากฏใน Terminal ไปใส่ใน `.env`

### สำหรับ Production
1. เข้าไปที่ **Developers > Webhooks**
2. กด **Add endpoint**
3. ใส่ URL: `https://your-domain.com/api/webhooks/stripe`
4. เลือก Event: `checkout.session.completed` (สำคัญที่สุดสำหรับระบบเรา)

## 5. การสร้าง Products & Prices (สำหรับ StarPackage)
เพื่อให้ระบบดึงข้อมูลราคาที่ถูกต้อง:
1. เข้าไปที่ **Product catalog**
2. กด **Add product** สำหรับแต่ละ StarPackage (เช่น Starter Pack, Pro Pack)
3. ตั้งชื่อและราคา (THB)
4. เมื่อสร้างเสร็จ ให้คัดลอก **Price ID** (เช่น `price_1Q...`) มาเก็บไว้ เพื่อนำไปใส่ใน Table `StarPackage` ใน Database ของเรา

---
**Oracle Note**: การตั้งค่า Branding ให้ตรงกับ MimiVibe จะช่วยลดความรู้สึกแปลกแยกเมื่อ User ถูก Redirect ไปยังหน้า Stripe และช่วยเพิ่ม Conversion Rate ได้
