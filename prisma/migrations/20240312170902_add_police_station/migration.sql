-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_suspectId_fkey";

-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_victimId_fkey";

-- AlterTable
ALTER TABLE "cases" ALTER COLUMN "victimId" DROP NOT NULL,
ALTER COLUMN "suspectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_victimId_fkey" FOREIGN KEY ("victimId") REFERENCES "personal_informations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_suspectId_fkey" FOREIGN KEY ("suspectId") REFERENCES "personal_informations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
