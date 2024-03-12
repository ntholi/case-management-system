/*
  Warnings:

  - You are about to drop the column `district` on the `cases` table. All the data in the column will be lost.
  - Added the required column `policeStationId` to the `cases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cases" DROP COLUMN "district",
ADD COLUMN     "policeStationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "PoliceStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
