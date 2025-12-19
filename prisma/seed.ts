import bcrypt from 'bcryptjs';
import { db } from '../lib/db';

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const admin = await db.user.upsert({
    where: { email: 'admin@zira.com' },
    update: {},
    create: {
      email: 'admin@zira.com',
      name: 'Admin User',
      password,
      role: 'ADMIN',
    },
  });

  console.log({ admin });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
