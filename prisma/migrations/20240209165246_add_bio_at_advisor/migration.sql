/*
  Warnings:

  - Added the required column `bio` to the `advisors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "advisors" ADD COLUMN     "bio" TEXT NOT NULL;
