/*
  Warnings:

  - Added the required column `policeStationId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "policeStationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "police_stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
