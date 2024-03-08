-- CreateEnum
CREATE TYPE "Education" AS ENUM ('NONE', 'PRIMARY', 'SECONDARY', 'TERTIARY', 'OTHER');

-- CreateEnum
CREATE TYPE "MeritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER');

-- CreateEnum
CREATE TYPE "NationalIdType" AS ENUM ('ID_CARD', 'DRIVING_LICENSE', 'PASSPORT', 'VOTERS_CARD', 'NONE', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEAMLE', 'OTHER');

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "caseId" INTEGER,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrimeClassification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "caseId" INTEGER,

    CONSTRAINT "CrimeClassification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportingPerson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idNo" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportingPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "rciNo" TEXT NOT NULL,
    "obNo" TEXT NOT NULL,
    "occurrencePlace" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reportingPersonId" INTEGER NOT NULL,
    "victimId" INTEGER NOT NULL,
    "suspectId" INTEGER NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" SERIAL NOT NULL,
    "nationalId" TEXT NOT NULL,
    "nationalIdType" "NationalIdType" NOT NULL,
    "surname" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "meritalStatus" "MeritalStatus" NOT NULL,
    "occupation" TEXT NOT NULL,
    "education" "Education" NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "areaChief" TEXT NOT NULL,
    "placeOfResidence" TEXT NOT NULL,
    "headMan" TEXT NOT NULL,
    "principalChief" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "nextOfKin" TEXT NOT NULL,
    "nextOfKinPhone" TEXT NOT NULL,

    CONSTRAINT "PersonalInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrimeClassification" ADD CONSTRAINT "CrimeClassification_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_reportingPersonId_fkey" FOREIGN KEY ("reportingPersonId") REFERENCES "ReportingPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_victimId_fkey" FOREIGN KEY ("victimId") REFERENCES "PersonalInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_suspectId_fkey" FOREIGN KEY ("suspectId") REFERENCES "PersonalInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
