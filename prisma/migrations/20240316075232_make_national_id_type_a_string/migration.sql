/*
  Warnings:

  - Added the required column `nationalIdType` to the `personal_informations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personal_informations" DROP COLUMN "nationalIdType",
ADD COLUMN     "nationalIdType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "NationalIdType";
