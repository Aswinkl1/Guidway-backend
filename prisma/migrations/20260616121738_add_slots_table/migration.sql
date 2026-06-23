-- CreateEnum
CREATE TYPE "SlotStatus" AS ENUM ('LOCKED', 'BOOKED', 'CANCELLED');

-- CreateTable
CREATE TABLE "slots" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT,
    "mentorId" TEXT NOT NULL,
    "lockedBy" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "SlotStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "slots_mentorId_date_idx" ON "slots"("mentorId", "date");

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_lockedBy_fkey" FOREIGN KEY ("lockedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- added by the developer because prisma does support exclude natively
-- Enable extension needed for equality checks inside GiST exclusion constraint
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Prevent endTime being before/equal to startTime
ALTER TABLE "slots" ADD CONSTRAINT valid_time_range CHECK ("endTime" > "startTime");

-- Prevent overlapping active slots for the same mentor on the same date
ALTER TABLE "slots" ADD CONSTRAINT no_overlap
EXCLUDE USING gist (
  "mentorId" WITH =,
  "date" WITH =,
  int4range("startTime", "endTime") WITH &&
)
WHERE (status IN ('LOCKED', 'BOOKED'));
