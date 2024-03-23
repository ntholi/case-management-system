-- DropIndex
DROP INDEX "personal_informations_national_id_key";

-- AlterTable
ALTER TABLE "personal_informations" ALTER COLUMN "national_id" DROP NOT NULL;
