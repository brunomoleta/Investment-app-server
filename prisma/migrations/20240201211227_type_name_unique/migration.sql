/*
  Warnings:

  - A unique constraint covering the columns `[type_name]` on the table `investment_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "investment_types_type_name_key" ON "investment_types"("type_name");
