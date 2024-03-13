/*
  Warnings:

  - The primary key for the `case_statuses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `cr_number` column on the `case_statuses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[cr_number]` on the table `case_statuses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "case_statuses" DROP CONSTRAINT "case_statuses_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "cr_number",
ADD COLUMN     "cr_number" SERIAL NOT NULL,
ADD CONSTRAINT "case_statuses_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "case_statuses_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "case_statuses_cr_number_key" ON "case_statuses"("cr_number");
