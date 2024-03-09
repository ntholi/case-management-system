/*
  Warnings:

  - You are about to drop the column `caseId` on the `CrimeClassification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CrimeClassification" DROP CONSTRAINT "CrimeClassification_caseId_fkey";

-- AlterTable
ALTER TABLE "CrimeClassification" DROP COLUMN "caseId";

-- CreateTable
CREATE TABLE "_CaseToCrimeClassification" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToCrimeClassification_AB_unique" ON "_CaseToCrimeClassification"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToCrimeClassification_B_index" ON "_CaseToCrimeClassification"("B");

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_B_fkey" FOREIGN KEY ("B") REFERENCES "CrimeClassification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
