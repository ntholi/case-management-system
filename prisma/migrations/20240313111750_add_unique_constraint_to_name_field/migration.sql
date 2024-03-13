/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `crime_classifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,district]` on the table `police_stations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `weapons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "crime_classifications_name_key" ON "crime_classifications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "police_stations_name_district_key" ON "police_stations"("name", "district");

-- CreateIndex
CREATE UNIQUE INDEX "weapons_name_key" ON "weapons"("name");
