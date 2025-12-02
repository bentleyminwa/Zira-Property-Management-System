generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

// Enums
enum Role {
  ADMIN
  MANAGER
  STAFF
}

enum PropertyStatus {
  AVAILABLE
  RENTED
  MAINTENANCE
}

enum PropertyType {
  APARTMENT
  HOUSE
  COMMERCIAL
  CONDO
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

enum MaintenanceStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum MaintenancePriority {
  LOW
  MEDIUM
  HIGH
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum PaymentMethod {
  CASH
  CARD
  BANK_TRANSFER
}

enum PaymentType {
  RENT
  DEPOSIT
  FEE
  UTILITY
}

// Models

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(STAFF)
  avatarUrl String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Property {
  id          String         @id @default(cuid())
  name        String
  description String?
  address     String         @default("Unknown")
  type        PropertyType   @default(APARTMENT)
  status      PropertyStatus @default(AVAILABLE)
  price       Decimal        @default(0.00) @db.Decimal(10, 2)
  size        Float? // in sq ft or sq m
  bedrooms    Int?
  bathrooms   Int?
  features    String[] // Array of strings for features like "Pool", "Gym"
  images      String[] // Array of image URLs
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  bookings    Booking[]
  maintenance Maintenance[]
}

model Tenant {
  id        String   @id @default(cuid())
  firstName String
  lastName  String
  email     String   @unique
  phone     String?
  idNumber  String? // National ID or Passport
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  bookings Booking[]
  payments Payment[]
}

model Booking {
  id         String        @id @default(cuid())
  startDate  DateTime
  endDate    DateTime
  status     BookingStatus @default(PENDING)
  totalPrice Decimal       @db.Decimal(10, 2)
  createdAt  DateTime      @default(now())
  updatedAt  DateTime      @updatedAt

  propertyId String
  property   Property @relation(fields: [propertyId], references: [id])

  tenantId String
  tenant   Tenant @relation(fields: [tenantId], references: [id])

  payments Payment[]
}

model Maintenance {
  id          String              @id @default(cuid())
  title       String
  description String
  status      MaintenanceStatus   @default(OPEN)
  priority    MaintenancePriority @default(MEDIUM)
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  propertyId String
  property   Property @relation(fields: [propertyId], references: [id])
}

model Payment {
  id        String        @id @default(cuid())
  amount    Decimal       @db.Decimal(10, 2)
  date      DateTime      @default(now())
  status    PaymentStatus @default(PENDING)
  method    PaymentMethod
  type      PaymentType
  reference String? // Transaction ID or Reference Number
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  bookingId String
  booking   Booking @relation(fields: [bookingId], references: [id])

  tenantId String
  tenant   Tenant @relation(fields: [tenantId], references: [id])
}
