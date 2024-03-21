/*
  Warnings:

  - The primary key for the `cases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `personal_informations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reporting_persons` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CaseToCrimeClassification" DROP CONSTRAINT "_CaseToCrimeClassification_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToSuspect" DROP CONSTRAINT "_CaseToSuspect_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToSuspect" DROP CONSTRAINT "_CaseToSuspect_B_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToVictim" DROP CONSTRAINT "_CaseToVictim_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToVictim" DROP CONSTRAINT "_CaseToVictim_B_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToWeapon" DROP CONSTRAINT "_CaseToWeapon_A_fkey";

-- DropForeignKey
ALTER TABLE "case_statuses" DROP CONSTRAINT "case_statuses_caseId_fkey";

-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_reporting_person_id_fkey";

-- AlterTable
ALTER TABLE "_CaseToCrimeClassification" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CaseToSuspect" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CaseToVictim" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CaseToWeapon" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "case_statuses" ALTER COLUMN "caseId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "cases" DROP CONSTRAINT "cases_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "reporting_person_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "cases_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cases_id_seq";

-- AlterTable
ALTER TABLE "personal_informations" DROP CONSTRAINT "personal_informations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "personal_informations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "personal_informations_id_seq";

-- AlterTable
ALTER TABLE "reporting_persons" DROP CONSTRAINT "reporting_persons_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "reporting_persons_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "reporting_persons_id_seq";

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_reporting_person_id_fkey" FOREIGN KEY ("reporting_person_id") REFERENCES "reporting_persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_statuses" ADD CONSTRAINT "case_statuses_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToVictim" ADD CONSTRAINT "_CaseToVictim_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToVictim" ADD CONSTRAINT "_CaseToVictim_B_fkey" FOREIGN KEY ("B") REFERENCES "personal_informations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToSuspect" ADD CONSTRAINT "_CaseToSuspect_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToSuspect" ADD CONSTRAINT "_CaseToSuspect_B_fkey" FOREIGN KEY ("B") REFERENCES "personal_informations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
