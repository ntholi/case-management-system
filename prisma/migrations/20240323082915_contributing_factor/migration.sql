/*
  Warnings:

  - You are about to drop the column `modus_operandi_details` on the `cases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cases" DROP COLUMN "modus_operandi_details",
ADD COLUMN     "contributing_factor" TEXT;
