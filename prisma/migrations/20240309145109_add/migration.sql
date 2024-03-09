-- CreateEnum
CREATE TYPE "ModusOperandeLined" AS ENUM ('YES', 'NO', 'UNKNOWN');

-- AlterTable
ALTER TABLE "cases" ADD COLUMN     "modusOperandeLinked" "ModusOperandeLined",
ADD COLUMN     "modusOperandi" TEXT,
ADD COLUMN     "modusOperandiDetails" TEXT,
ALTER COLUMN "occurrencePlace" DROP NOT NULL;
