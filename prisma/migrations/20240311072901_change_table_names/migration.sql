/*
  Warnings:

  - You are about to drop the `CrimeClassification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportingPerson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weapon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CaseToCrimeClassification" DROP CONSTRAINT "_CaseToCrimeClassification_B_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToWeapon" DROP CONSTRAINT "_CaseToWeapon_B_fkey";

-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_reportingPersonId_fkey";

-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_suspectId_fkey";

-- DropForeignKey
ALTER TABLE "cases" DROP CONSTRAINT "cases_victimId_fkey";

-- DropTable
DROP TABLE "CrimeClassification";

-- DropTable
DROP TABLE "PersonalInformation";

-- DropTable
DROP TABLE "ReportingPerson";

-- DropTable
DROP TABLE "Weapon";

-- CreateTable
CREATE TABLE "weapons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crime_classifications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crime_classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reporting_persons" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "idNo" TEXT,
    "phoneNumber" TEXT,
    "relationship" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reporting_persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_informations" (
    "id" SERIAL NOT NULL,
    "nationalId" TEXT NOT NULL,
    "nationalIdType" "NationalIdType",
    "surname" TEXT,
    "middleName" TEXT,
    "firstName" TEXT,
    "gender" "Gender",
    "phoneNumber" TEXT,
    "email" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "nationality" TEXT,
    "meritalStatus" "MeritalStatus",
    "occupation" TEXT,
    "education" "Education",
    "placeOfBirth" TEXT,
    "areaChief" TEXT,
    "placeOfResidence" TEXT,
    "headMan" TEXT,
    "principalChief" TEXT,
    "district" TEXT,
    "nextOfKin" TEXT,
    "nextOfKinPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personal_informations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personal_informations_nationalId_key" ON "personal_informations"("nationalId");

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_reportingPersonId_fkey" FOREIGN KEY ("reportingPersonId") REFERENCES "reporting_persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_victimId_fkey" FOREIGN KEY ("victimId") REFERENCES "personal_informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_suspectId_fkey" FOREIGN KEY ("suspectId") REFERENCES "personal_informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_B_fkey" FOREIGN KEY ("B") REFERENCES "crime_classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
