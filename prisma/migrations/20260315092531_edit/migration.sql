/*
  Warnings:

  - You are about to drop the column `isRevoked` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "isRevoked",
DROP COLUMN "type",
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- DropEnum
DROP TYPE "TokenType";
