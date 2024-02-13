/*
  Warnings:

  - You are about to drop the column `specialty_id` on the `advisors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "advisors" DROP CONSTRAINT "advisors_specialty_id_fkey";

-- AlterTable
ALTER TABLE "advisors" DROP COLUMN "specialty_id",
ADD COLUMN     "speciality_id" TEXT;

-- AddForeignKey
ALTER TABLE "advisors" ADD CONSTRAINT "advisors_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "investment_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
