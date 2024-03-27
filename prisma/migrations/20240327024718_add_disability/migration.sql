/*
  Warnings:

  - You are about to drop the column `disability` on the `cases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cases" DROP COLUMN "disability";

-- AlterTable
ALTER TABLE "personal_informations" ADD COLUMN     "disability" TEXT;
