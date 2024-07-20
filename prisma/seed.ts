import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const users = [
    { name: 'Randu', email: 'randu@example.com' },
    { name: 'Flores', email: 'flores@example.com' },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Create categories
  const categories = [
    { name: 'Food', color: '#FF0000' },
    { name: 'Rent', color: '#00FF00' },
    { name: 'Entertainment', color: '#0000FF' },
  ];

    for (const category of categories) {
        await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
        });
    }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

