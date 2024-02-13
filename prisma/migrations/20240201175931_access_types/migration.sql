/*
  Warnings:

  - You are about to drop the column `is_super` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `is_super` on the `advisors` table. All the data in the column will be lost.
  - You are about to drop the column `is_super` on the `investors` table. All the data in the column will be lost.
  - Added the required column `access_type` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_type` to the `advisors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_type` to the `investors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "is_super",
ADD COLUMN     "access_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "advisors" DROP COLUMN "is_super",
ADD COLUMN     "access_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "investors" DROP COLUMN "is_super",
ADD COLUMN     "access_type" TEXT NOT NULL;
