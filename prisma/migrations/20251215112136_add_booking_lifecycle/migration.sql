-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('SHORT_TERM', 'LONG_TERM');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BookingStatus" ADD VALUE 'ACTIVE';
ALTER TYPE "BookingStatus" ADD VALUE 'TERMINATED';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "depositAmount" DECIMAL(10,2),
ADD COLUMN     "moveInDate" TIMESTAMP(3),
ADD COLUMN     "moveOutDate" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "terminatedAt" TIMESTAMP(3),
ADD COLUMN     "type" "BookingType" NOT NULL DEFAULT 'SHORT_TERM';

-- AlterTable
ALTER TABLE "Maintenance" ADD COLUMN     "bookingId" TEXT;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
