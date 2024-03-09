/*
  Warnings:

  - You are about to drop the `Case` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_reportingPersonId_fkey";

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_suspectId_fkey";

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_victimId_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToCrimeClassification" DROP CONSTRAINT "_CaseToCrimeClassification_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToWeapon" DROP CONSTRAINT "_CaseToWeapon_A_fkey";

-- DropTable
DROP TABLE "Case";

-- CreateTable
CREATE TABLE "cases" (
    "id" SERIAL NOT NULL,
    "rciNo" TEXT NOT NULL,
    "obNo" TEXT NOT NULL,
    "occurrencePlace" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reportingPersonId" INTEGER NOT NULL,
    "victimId" INTEGER NOT NULL,
    "suspectId" INTEGER NOT NULL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_reportingPersonId_fkey" FOREIGN KEY ("reportingPersonId") REFERENCES "ReportingPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_victimId_fkey" FOREIGN KEY ("victimId") REFERENCES "PersonalInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_suspectId_fkey" FOREIGN KEY ("suspectId") REFERENCES "PersonalInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
