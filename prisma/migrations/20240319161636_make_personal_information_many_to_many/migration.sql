/*
  Warnings:

  - You are about to drop the column `suspectId` on the `cases` table. All the data in the column will be lost.
  - You are about to drop the column `victimId` on the `cases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_suspectId_fkey";

-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_victimId_fkey";

-- AlterTable
ALTER TABLE "cases" DROP COLUMN "suspectId",
DROP COLUMN "victimId";

-- CreateTable
CREATE TABLE "_CaseToVictim" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CaseToSuspect" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToVictim_AB_unique" ON "_CaseToVictim"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToVictim_B_index" ON "_CaseToVictim"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToSuspect_AB_unique" ON "_CaseToSuspect"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToSuspect_B_index" ON "_CaseToSuspect"("B");

-- AddForeignKey
ALTER TABLE "_CaseToVictim" ADD CONSTRAINT "_CaseToVictim_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToVictim" ADD CONSTRAINT "_CaseToVictim_B_fkey" FOREIGN KEY ("B") REFERENCES "personal_informations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToSuspect" ADD CONSTRAINT "_CaseToSuspect_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToSuspect" ADD CONSTRAINT "_CaseToSuspect_B_fkey" FOREIGN KEY ("B") REFERENCES "personal_informations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
