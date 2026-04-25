/*
  Warnings:

  - Added the required column `updatedAt` to the `education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startMonth` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startYear` on table `experiences` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'FREELANCE', 'INTERNSHIP', 'CONTRACT');

-- AlterTable
ALTER TABLE "education" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "experiences" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "startMonth" SET NOT NULL,
ALTER COLUMN "startYear" SET NOT NULL;
