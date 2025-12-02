import { PrismaClient, PropertyStatus, PropertyType } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.maintenance.deleteMany();
  await prisma.property.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.user.deleteMany();

  console.log('Deleted existing data.');

  // Create Properties
  // const properties = [
  //   {
  //     name: 'Sunset Apartments',
  //     description: 'Luxury apartments with a view of the sunset.',
  //     address: '123 Sunset Blvd, Los Angeles, CA',
  //     type: PropertyType.APARTMENT,
  //     status: PropertyStatus.AVAILABLE,
  //     price: 2500.0,
  //     size: 1200,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     features:
  // ,
  //     images: [
  //       '/assets/images/properties/property-0.jpg',
  //       '/assets/images/properties/property-1.jpg',
  //     ],
  //   },
  //   {
  //     name: 'Cozy Cottage',
  //     description: 'A charming cottage in a quiet neighborhood.',
  //     address: '456 Oak Lane, Portland, OR',
  //     type: PropertyType.HOUSE,
  //     status: PropertyStatus.RENTED,
  //     price: 1800.0,
  //     size: 950,
  //     bedrooms: 2,
  //     bathrooms: 1,
  //     features: ['Garden', 'Fireplace', 'Pet Friendly'],
  //     images: ['/assets/images/properties/property-2.jpg'],
  //   },
  //   {
  //     name: 'Downtown Loft',
  //     description: 'Modern loft in the heart of the city.',
  //     address: '789 Main St, New York, NY',
  //     type: PropertyType.APARTMENT,
  //     status: PropertyStatus.AVAILABLE,
  //     price: 3500.0,
  //     size: 1500,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     features: ['High Ceilings', 'Exposed Brick', 'Concierge'],
  //     images: ['/assets/images/properties/property-3.jpg'],
  //   },
  //   {
  //     name: 'Suburban Family Home',
  //     description: 'Spacious home perfect for a family.',
  //     address: '101 Maple Dr, Austin, TX',
  //     type: PropertyType.HOUSE,
  //     status: PropertyStatus.AVAILABLE,
  //     price: 2200.0,
  //     size: 2000,
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     features: ['Garage', 'Backyard', 'School District'],
  //     images: ['/assets/images/properties/property-4.jpg'],
  //   },
  //   {
  //     name: 'Seaside Condo',
  //     description: 'Relaxing condo steps from the beach.',
  //     address: '202 Ocean View, Miami, FL',
  //     type: PropertyType.CONDO,
  //     status: PropertyStatus.MAINTENANCE,
  //     price: 2800.0,
  //     size: 1100,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     features: ['Ocean View', 'Pool', 'Security'],
  //     images: ['/assets/images/properties/property-5.jpg'],
  //   },
  // ];

  // for (const prop of properties) {
  //   await prisma.property.create({
  //     data: prop,
  //   });
  // }

  // console.log(`Seeded ${properties.length} properties.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
