/*
  Warnings:

  - A unique constraint covering the columns `[rciNo]` on the table `cases` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cases_rciNo_key" ON "cases"("rciNo");
