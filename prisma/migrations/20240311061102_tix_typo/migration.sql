/*
  Warnings:

  - You are about to drop the column `modusOperandeLinked` on the `cases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cases" DROP COLUMN "modusOperandeLinked",
ADD COLUMN     "modusOperandiLinked" "ModusOperandiLined";
