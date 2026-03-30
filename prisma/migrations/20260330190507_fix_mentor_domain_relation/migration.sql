/*
  Warnings:

  - You are about to drop the column `isPublic` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `isSuspended` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[domainName]` on the table `domains` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `proficiency` on the `mentor_languages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MentorStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'PAUSED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ProficiencyLevel" AS ENUM ('native', 'fluent', 'conversational', 'basic');

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_fkey";

-- AlterTable
ALTER TABLE "mentor_languages" DROP COLUMN "proficiency",
ADD COLUMN     "proficiency" "ProficiencyLevel" NOT NULL;

-- AlterTable
ALTER TABLE "mentors" DROP COLUMN "isPublic",
DROP COLUMN "isSuspended",
ADD COLUMN     "onboardingStep" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "status" "MentorStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profileImageUrl",
ADD COLUMN     "profileImageKey" TEXT,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- DropTable
DROP TABLE "tokens";

-- CreateIndex
CREATE UNIQUE INDEX "domains_domainName_key" ON "domains"("domainName");
