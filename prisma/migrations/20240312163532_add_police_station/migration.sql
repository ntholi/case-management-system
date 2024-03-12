/*
  Warnings:

  - You are about to drop the `PoliceStation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_policeStationId_fkey";

-- DropTable
DROP TABLE "PoliceStation";

-- CreateTable
CREATE TABLE "police_stations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "district" "District" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "police_stations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "police_stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
