import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { Prisma, PrismaClient } from '../app/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const propertyData: Prisma.PropertyCreateInput[] = [
  {
    name: 'Property 1',
  },
];

export async function main() {
  for (const property of propertyData) {
    await prisma.property.create({ data: property });
  }
}

main();
