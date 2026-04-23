/*
  Warnings:

  - You are about to drop the column `endDate` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `experiences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "education" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endMonth" INTEGER,
ADD COLUMN     "endYear" INTEGER,
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startMonth" INTEGER,
ADD COLUMN     "startYear" INTEGER;

-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endMonth" INTEGER,
ADD COLUMN     "endYear" INTEGER,
ADD COLUMN     "startMonth" INTEGER,
ADD COLUMN     "startYear" INTEGER;
