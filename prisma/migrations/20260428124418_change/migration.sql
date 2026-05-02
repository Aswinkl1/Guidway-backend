/*
  Warnings:

  - The values [award,certification,competition,publication,speaking,hackathon_win,scholarship,work_recognition,other] on the enum `AchievementType` will be removed. If these variants are still used in the database, this will fail.
  - The values [native,fluent,conversational,basic] on the enum `ProficiencyLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [admin,mentor,mentee] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [active,pending_review,rejected] on the enum `SkillStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [linkedin,github,twitter,instagram,facebook,website,behance,dribbble,youtube,other] on the enum `SocialPlatform` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `mentors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookingFutureLimitDays` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `bookingLeadTimeHours` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `bufferTimeMinutes` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `cancellationCutoffHours` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `maxSessionsDaily` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `notificationSettings` on the `mentors` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `languages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `languages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `achievements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `domains` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AchievementType_new" AS ENUM ('AWARD', 'CERTIFICATION', 'COMPETITION', 'PUBLICATION', 'SPEAKING', 'HACKATHON_WIN', 'SCHOLARSHIP', 'WORK_RECOGNITION', 'OTHER');
ALTER TABLE "achievements" ALTER COLUMN "type" TYPE "AchievementType_new" USING ("type"::text::"AchievementType_new");
ALTER TYPE "AchievementType" RENAME TO "AchievementType_old";
ALTER TYPE "AchievementType_new" RENAME TO "AchievementType";
DROP TYPE "public"."AchievementType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProficiencyLevel_new" AS ENUM ('NATIVE', 'FLUENT', 'CONVERSATIONAL', 'BASIC');
ALTER TABLE "mentor_languages" ALTER COLUMN "proficiency" TYPE "ProficiencyLevel_new" USING ("proficiency"::text::"ProficiencyLevel_new");
ALTER TYPE "ProficiencyLevel" RENAME TO "ProficiencyLevel_old";
ALTER TYPE "ProficiencyLevel_new" RENAME TO "ProficiencyLevel";
DROP TYPE "public"."ProficiencyLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'MENTOR', 'MENTEE');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'MENTEE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SkillStatus_new" AS ENUM ('ACTIVE', 'PENDING_REVIEW', 'REJECTED');
ALTER TABLE "public"."skills" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "skills" ALTER COLUMN "status" TYPE "SkillStatus_new" USING ("status"::text::"SkillStatus_new");
ALTER TYPE "SkillStatus" RENAME TO "SkillStatus_old";
ALTER TYPE "SkillStatus_new" RENAME TO "SkillStatus";
DROP TYPE "public"."SkillStatus_old";
ALTER TABLE "skills" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SocialPlatform_new" AS ENUM ('LINKEDIN', 'GITHUB', 'TWITTER', 'INSTAGRAM', 'FACEBOOK', 'WEBSITE', 'BEHANCE', 'DRIBBBLE', 'YOUTUBE', 'OTHER');
ALTER TABLE "social_links" ALTER COLUMN "platform" TYPE "SocialPlatform_new" USING ("platform"::text::"SocialPlatform_new");
ALTER TYPE "SocialPlatform" RENAME TO "SocialPlatform_old";
ALTER TYPE "SocialPlatform_new" RENAME TO "SocialPlatform";
DROP TYPE "public"."SocialPlatform_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "education" DROP CONSTRAINT "education_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "mentor_languages" DROP CONSTRAINT "mentor_languages_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "mentor_skills" DROP CONSTRAINT "mentor_skills_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_mentorId_fkey";

-- DropIndex
DROP INDEX "mentors_userId_key";

-- DropIndex
DROP INDEX "social_links_mentorId_platform_key";

-- AlterTable
ALTER TABLE "achievements" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "domains" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "mentors" DROP CONSTRAINT "mentors_pkey",
DROP COLUMN "bookingFutureLimitDays",
DROP COLUMN "bookingLeadTimeHours",
DROP COLUMN "bufferTimeMinutes",
DROP COLUMN "cancellationCutoffHours",
DROP COLUMN "id",
DROP COLUMN "maxSessionsDaily",
DROP COLUMN "notificationSettings",
ADD CONSTRAINT "mentors_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isDeleted",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "role" SET DEFAULT 'MENTEE';

-- CreateTable
CREATE TABLE "mentor_booking_settings" (
    "userId" TEXT NOT NULL,
    "leadTimeHours" INTEGER NOT NULL DEFAULT 24,
    "futureLimitDays" INTEGER NOT NULL DEFAULT 30,
    "maxSessionsDaily" INTEGER NOT NULL DEFAULT 4,
    "bufferTimeMinutes" INTEGER NOT NULL DEFAULT 15,
    "cancellationCutoffHours" INTEGER NOT NULL DEFAULT 24,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentor_booking_settings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "mentor_notification_settings" (
    "userId" TEXT NOT NULL,
    "emailOnBooking" BOOLEAN NOT NULL DEFAULT true,
    "emailOnCancel" BOOLEAN NOT NULL DEFAULT true,
    "emailOnReview" BOOLEAN NOT NULL DEFAULT true,
    "smsOnBooking" BOOLEAN NOT NULL DEFAULT false,
    "smsOnCancel" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentor_notification_settings_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "achievements_mentorId_idx" ON "achievements"("mentorId");

-- CreateIndex
CREATE INDEX "education_mentorId_idx" ON "education"("mentorId");

-- CreateIndex
CREATE INDEX "experiences_mentorId_idx" ON "experiences"("mentorId");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE INDEX "mentors_status_idx" ON "mentors"("status");

-- CreateIndex
CREATE INDEX "mentors_domainId_idx" ON "mentors"("domainId");

-- CreateIndex
CREATE INDEX "social_links_mentorId_idx" ON "social_links"("mentorId");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- AddForeignKey
ALTER TABLE "mentor_booking_settings" ADD CONSTRAINT "mentor_booking_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_notification_settings" ADD CONSTRAINT "mentor_notification_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_languages" ADD CONSTRAINT "mentor_languages_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_skills" ADD CONSTRAINT "mentor_skills_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
