import prisma from '@/lib/prisma';

export default async function Dashboard() {
  const properties = await prisma.property.findMany();

  return (
    <div>
      <h1>Properties</h1>

      <ul>
        {properties.map((property) => (
          <li key={property.id}>{property.name}</li>
        ))}
      </ul>
    </div>
  );
}
