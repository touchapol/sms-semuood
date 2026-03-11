# SMS Simulation & Provider

**SMS Simulation & Provider** จำลองการรับ SMS

## การติดตั้งและการเริ่มระบบ (Getting Started)

1. **โคลนโปรเจ็กต์และติดตั้ง Dependencies:**
   \`\`\`bash
   npm install
   # หรือใช้ bun: bun install
   \`\`\`

2. **เตรียมระบบฐานข้อมูล (Prisma):**
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

3. **รันการใช้งานเซิร์ฟเวอร์ (Development):**
   \`\`\`bash
   npm run dev
   # หรือใช้ bun: bun run dev
   \`\`\`

จากนั้นให้เข้าไปที่ `http://localhost:3000` คุณอาจถูกร้องขอให้กรอกหรือสุ่มเบอร์โทรศัพท์สำหรับ Register ก่อนใช้งาน