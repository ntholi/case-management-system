/*
  Warnings:

  - A unique constraint covering the columns `[nationalId]` on the table `PersonalInformation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PersonalInformation_nationalId_key" ON "PersonalInformation"("nationalId");
