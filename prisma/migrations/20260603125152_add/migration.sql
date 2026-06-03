-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailabilityException" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailabilityException_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Availability_mentorId_idx" ON "Availability"("mentorId");

-- CreateIndex
CREATE INDEX "Session_mentorId_price_idx" ON "Session"("mentorId", "price");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
