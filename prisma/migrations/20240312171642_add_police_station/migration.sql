/*
  Warnings:

  - A unique constraint covering the columns `[reportingPersonId]` on the table `cases` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cases_reportingPersonId_key" ON "cases"("reportingPersonId");
