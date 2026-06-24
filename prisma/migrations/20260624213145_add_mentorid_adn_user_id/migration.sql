/*
  Warnings:

  - Added the required column `mentorId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "mentorId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
