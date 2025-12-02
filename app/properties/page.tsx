import prisma from '@/lib/prisma';
import type { Property } from '@prisma/client';

export default async function Properties() {
  const properties: Property[] = await prisma.property.findMany();

  return (
    <div>
      <h1>Properties</h1>

      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <span>{property.name}</span>
            {property.image && (
              <img
                src={property.image}
                alt={property.name}
                width={100}
                height={100}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
