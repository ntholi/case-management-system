/*
  Warnings:

  - The `modusOperandeLinked` column on the `cases` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ModusOperandiLined" AS ENUM ('YES', 'NO', 'UNKNOWN');

-- AlterTable
ALTER TABLE "cases" DROP COLUMN "modusOperandeLinked",
ADD COLUMN     "modusOperandeLinked" "ModusOperandiLined";

-- DropEnum
DROP TYPE "ModusOperandeLined";
