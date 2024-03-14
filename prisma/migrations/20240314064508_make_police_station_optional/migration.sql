-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_policeStationId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "policeStationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "police_stations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
