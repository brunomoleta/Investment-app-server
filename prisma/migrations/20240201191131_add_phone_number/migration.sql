/*
  Warnings:

  - Added the required column `phone_number` to the `advisors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `investors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "advisors" ADD COLUMN     "phone_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "investors" ADD COLUMN     "phone_number" TEXT NOT NULL;
