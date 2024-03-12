/*
  Warnings:

  - You are about to drop the column `meritalStatus` on the `personal_informations` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER');

-- AlterTable
ALTER TABLE "personal_informations" DROP COLUMN "meritalStatus",
ADD COLUMN     "maritalStatus" "MaritalStatus";

-- DropEnum
DROP TYPE "MeritalStatus";
