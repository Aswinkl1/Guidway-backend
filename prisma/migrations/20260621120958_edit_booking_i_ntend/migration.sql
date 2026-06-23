/*
  Warnings:

  - You are about to drop the column `currensy` on the `booking_intents` table. All the data in the column will be lost.
  - Added the required column `currency` to the `booking_intents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "currency" AS ENUM ('INR', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF', 'SGD');

-- AlterTable
ALTER TABLE "booking_intents" DROP COLUMN "currensy",
ADD COLUMN     "currency" "currency" NOT NULL;
