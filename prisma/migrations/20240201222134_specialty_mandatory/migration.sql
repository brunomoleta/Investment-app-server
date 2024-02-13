/*
  Warnings:

  - Made the column `speciality_id` on table `advisors` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "advisors" DROP CONSTRAINT "advisors_speciality_id_fkey";

-- AlterTable
ALTER TABLE "advisors" ALTER COLUMN "speciality_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "advisors" ADD CONSTRAINT "advisors_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "investment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
