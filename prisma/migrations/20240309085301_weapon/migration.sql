/*
  Warnings:

  - You are about to drop the column `caseId` on the `Weapon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_caseId_fkey";

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "caseId";

-- CreateTable
CREATE TABLE "_CaseToWeapon" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToWeapon_AB_unique" ON "_CaseToWeapon"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToWeapon_B_index" ON "_CaseToWeapon"("B");

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
