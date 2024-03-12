/*
  Warnings:

  - The primary key for the `police_stations` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_policeStationId_fkey";

-- AlterTable
ALTER TABLE "cases" ALTER COLUMN "policeStationId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "police_stations" DROP CONSTRAINT "police_stations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "police_stations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "police_stations_id_seq";

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "police_stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
