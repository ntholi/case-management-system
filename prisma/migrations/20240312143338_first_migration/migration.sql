-- CreateEnum
CREATE TYPE "Education" AS ENUM ('NONE', 'PRIMARY', 'SECONDARY', 'TERTIARY', 'OTHER');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER');

-- CreateEnum
CREATE TYPE "NationalIdType" AS ENUM ('ID_CARD', 'DRIVING_LICENSE', 'PASSPORT', 'VOTERS_CARD', 'OTHER', 'NONE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ModusOperandiLined" AS ENUM ('YES', 'NO', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "District" AS ENUM ('BEREA', 'BUTHA_BUTHE', 'LERIBE', 'MASERU_URBAN', 'MASERU_RURAL', 'MAFETENG', 'MOHALES_HOEK', 'MOKHOTLONG', 'QACHAS_NEK', 'QUTHING', 'THABA_TSEKA');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "hashed_password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

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
CREATE TABLE "cases" (
    "id" SERIAL NOT NULL,
    "rciNo" TEXT NOT NULL,
    "obNo" TEXT NOT NULL,
    "occurrencePlace" TEXT,
    "district" "District",
    "modusOperandi" TEXT,
    "modusOperandiDetails" TEXT,
    "modusOperandiLinked" "ModusOperandiLined",
    "dateOfOccurrence" TIMESTAMP(3),
    "dateOfReport" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reportingPersonId" INTEGER NOT NULL,
    "victimId" INTEGER NOT NULL,
    "suspectId" INTEGER NOT NULL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
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
    "maritalStatus" "MaritalStatus",
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

-- CreateTable
CREATE TABLE "_CaseToWeapon" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CaseToCrimeClassification" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "personal_informations_nationalId_key" ON "personal_informations"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToWeapon_AB_unique" ON "_CaseToWeapon"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToWeapon_B_index" ON "_CaseToWeapon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToCrimeClassification_AB_unique" ON "_CaseToCrimeClassification"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToCrimeClassification_B_index" ON "_CaseToCrimeClassification"("B");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_reportingPersonId_fkey" FOREIGN KEY ("reportingPersonId") REFERENCES "reporting_persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_victimId_fkey" FOREIGN KEY ("victimId") REFERENCES "personal_informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_suspectId_fkey" FOREIGN KEY ("suspectId") REFERENCES "personal_informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_B_fkey" FOREIGN KEY ("B") REFERENCES "crime_classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
