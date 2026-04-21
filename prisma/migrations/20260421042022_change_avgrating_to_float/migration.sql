/*
  Warnings:

  - You are about to drop the column `onboardingStep` on the `mentors` table. All the data in the column will be lost.
  - You are about to alter the column `averageRating` on the `mentors` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "mentors" DROP COLUMN "onboardingStep",
ALTER COLUMN "averageRating" SET DATA TYPE DOUBLE PRECISION;
