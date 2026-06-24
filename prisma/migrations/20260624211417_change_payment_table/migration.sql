/*
  Warnings:

  - You are about to drop the column `amount` on the `payments` table. All the data in the column will be lost.
  - Added the required column `amountInMinorUnit` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "amount",
ADD COLUMN     "amountInMinorUnit" INTEGER NOT NULL;
