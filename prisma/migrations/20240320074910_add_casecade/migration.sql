-- DropForeignKey
ALTER TABLE "case_statuses" DROP CONSTRAINT "case_statuses_caseId_fkey";

-- AlterTable
ALTER TABLE "cases" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "case_statuses" ADD CONSTRAINT "case_statuses_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
