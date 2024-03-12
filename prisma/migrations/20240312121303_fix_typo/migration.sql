/*
  Warnings:

  - The `district` column on the `cases` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "District" AS ENUM ('BEREA', 'BUTHA_BUTHE', 'LERIBE', 'MASERU_URBAN', 'MASERU_RURAL', 'MAFETENG', 'MOHALES_HOEK', 'MOKHOTLONG', 'QACHAS_NEK', 'QUTHING', 'THABA_TSEKA');

-- AlterTable
ALTER TABLE "cases" DROP COLUMN "district",
ADD COLUMN     "district" "District";

-- DropEnum
DROP TYPE "Destrict";
