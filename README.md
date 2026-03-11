# SMS Simulation & Provider

**SMS Simulation & Provider** จำลองการรับ SMS

## การติดตั้งและการเริ่มระบบ (Getting Started)

1. **โคลนโปรเจ็กต์และติดตั้ง Dependencies:**
   npm install หรือใช้ bun install

2. **เตรียมระบบฐานข้อมูล (Prisma):**
   npx prisma generate
   npx prisma db push

3. **รันการใช้งานเซิร์ฟเวอร์ (Development):**
   npm run dev หรือใช้ bun run dev

จากนั้นให้เข้าไปที่ `http://localhost:3000` คุณอาจถูกร้องขอให้กรอกหรือสุ่มเบอร์โทรศัพท์สำหรับ Register ก่อนใช้งาน