/*
  Warnings:

  - You are about to drop the column `school` on the `education` table. All the data in the column will be lost.
  - Added the required column `fieldOfStudy` to the `education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `education` table without a default value. This is not possible if the table is not empty.
  - Made the column `degree` on table `education` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startMonth` on table `education` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startYear` on table `education` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "education" DROP COLUMN "school",
ADD COLUMN     "fieldOfStudy" TEXT NOT NULL,
ADD COLUMN     "institution" TEXT NOT NULL,
ALTER COLUMN "degree" SET NOT NULL,
ALTER COLUMN "startMonth" SET NOT NULL,
ALTER COLUMN "startYear" SET NOT NULL;
