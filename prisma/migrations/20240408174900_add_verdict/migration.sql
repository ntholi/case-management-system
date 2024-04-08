-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('GUILTY', 'NOT_GUILTY', 'UNKNOWN');

-- AlterTable
ALTER TABLE "case_statuses" ADD COLUMN     "sentence" TEXT,
ADD COLUMN     "verdict" "Verdict" DEFAULT 'UNKNOWN';
