-- CreateEnum
CREATE TYPE "PoliceCaseStatus" AS ENUM ('PENDING_ALLOCATION', 'PENDING_INVESTIGATION', 'PENDING_ARREST', 'PENDING_STATEMENT', 'AWAITS_EXHIBIT');

-- CreateEnum
CREATE TYPE "CourtCaseStatus" AS ENUM ('REMANDED_FF_INVESTIGATION', 'PENDING_HEARING', 'PENDING_SET_DOWN', 'DIVERTED', 'PART_HEARD');

-- CreateTable
CREATE TABLE "case_statuses" (
    "id" SERIAL NOT NULL,
    "cr_number" TEXT NOT NULL,
    "police_case_status" "PoliceCaseStatus" NOT NULL DEFAULT 'PENDING_ALLOCATION',
    "court_case_status" "CourtCaseStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "caseId" INTEGER NOT NULL,

    CONSTRAINT "case_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "case_statuses_caseId_key" ON "case_statuses"("caseId");

-- AddForeignKey
ALTER TABLE "case_statuses" ADD CONSTRAINT "case_statuses_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
