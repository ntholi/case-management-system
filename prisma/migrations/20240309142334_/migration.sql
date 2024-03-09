/*
  Warnings:

  - The primary key for the `CrimeClassification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Weapon` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CaseToCrimeClassification" DROP CONSTRAINT "_CaseToCrimeClassification_B_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToWeapon" DROP CONSTRAINT "_CaseToWeapon_B_fkey";

-- AlterTable
ALTER TABLE "CrimeClassification" DROP CONSTRAINT "CrimeClassification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CrimeClassification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CrimeClassification_id_seq";

-- AlterTable
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Weapon_id_seq";

-- AlterTable
ALTER TABLE "_CaseToCrimeClassification" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CaseToWeapon" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_B_fkey" FOREIGN KEY ("B") REFERENCES "CrimeClassification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
