-- CreateEnum
CREATE TYPE "Education" AS ENUM ('NONE', 'PRIMARY', 'SECONDARY', 'TERTIARY', 'OTHER');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ModusOperandiLined" AS ENUM ('YES', 'NO', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "District" AS ENUM ('BEREA', 'BUTHA_BUTHE', 'LERIBE', 'MASERU_URBAN', 'MASERU_RURAL', 'MAFETENG', 'MOHALES_HOEK', 'MOKHOTLONG', 'QACHAS_NEK', 'QUTHING', 'THABA_TSEKA');

-- CreateEnum
CREATE TYPE "PoliceCaseStatus" AS ENUM ('PENDING_ALLOCATION', 'PENDING_INVESTIGATION', 'PENDING_ARREST', 'PENDING_STATEMENT', 'AWAITS_EXHIBIT');

-- CreateEnum
CREATE TYPE "CourtCaseStatus" AS ENUM ('REMANDED_FF_INVESTIGATION', 'PENDING_HEARING', 'PENDING_SET_DOWN', 'DIVERTED', 'PART_HEARD');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
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
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "police_station_id" TEXT,

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crime_classifications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crime_classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "police_stations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "district" "District" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "police_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reporting_persons" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "national_id" TEXT,
    "phone_number" TEXT,
    "relationship" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reporting_persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cases" (
    "id" SERIAL NOT NULL,
    "rci_no" TEXT NOT NULL,
    "ob_no" TEXT NOT NULL,
    "occurrence_place" TEXT,
    "modus_operandi" TEXT,
    "modus_operandi_details" TEXT,
    "modus_operandi_linked" "ModusOperandiLined",
    "date_of_occurrence" TIMESTAMP(3),
    "date_of_report" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "police_station_id" TEXT NOT NULL,
    "reporting_person_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_statuses" (
    "id" TEXT NOT NULL,
    "cr_number" SERIAL NOT NULL,
    "police_case_status" "PoliceCaseStatus" NOT NULL DEFAULT 'PENDING_ALLOCATION',
    "court_case_status" "CourtCaseStatus",
    "caseId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_informations" (
    "id" SERIAL NOT NULL,
    "national_id" TEXT NOT NULL,
    "national_id_type" TEXT NOT NULL,
    "surname" TEXT,
    "middle_name" TEXT,
    "first_name" TEXT,
    "gender" "Gender",
    "phone_number" TEXT,
    "email" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "nationality" TEXT,
    "marital_status" "MaritalStatus",
    "occupation" TEXT,
    "education" "Education",
    "place_of_birth" TEXT,
    "area_chief" TEXT,
    "place_of_residence" TEXT,
    "head_man" TEXT,
    "principal_chief" TEXT,
    "district" TEXT,
    "next_of_kin" TEXT,
    "next_of_kin_phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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

-- CreateTable
CREATE TABLE "_CaseToVictim" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CaseToSuspect" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "weapons_name_key" ON "weapons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "crime_classifications_name_key" ON "crime_classifications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "police_stations_name_district_key" ON "police_stations"("name", "district");

-- CreateIndex
CREATE UNIQUE INDEX "cases_rci_no_key" ON "cases"("rci_no");

-- CreateIndex
CREATE UNIQUE INDEX "cases_ob_no_key" ON "cases"("ob_no");

-- CreateIndex
CREATE UNIQUE INDEX "cases_reporting_person_id_key" ON "cases"("reporting_person_id");

-- CreateIndex
CREATE UNIQUE INDEX "case_statuses_cr_number_key" ON "case_statuses"("cr_number");

-- CreateIndex
CREATE UNIQUE INDEX "case_statuses_caseId_key" ON "case_statuses"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "personal_informations_national_id_key" ON "personal_informations"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToWeapon_AB_unique" ON "_CaseToWeapon"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToWeapon_B_index" ON "_CaseToWeapon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToCrimeClassification_AB_unique" ON "_CaseToCrimeClassification"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToCrimeClassification_B_index" ON "_CaseToCrimeClassification"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToVictim_AB_unique" ON "_CaseToVictim"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToVictim_B_index" ON "_CaseToVictim"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseToSuspect_AB_unique" ON "_CaseToSuspect"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseToSuspect_B_index" ON "_CaseToSuspect"("B");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_police_station_id_fkey" FOREIGN KEY ("police_station_id") REFERENCES "police_stations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_police_station_id_fkey" FOREIGN KEY ("police_station_id") REFERENCES "police_stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_reporting_person_id_fkey" FOREIGN KEY ("reporting_person_id") REFERENCES "reporting_persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_statuses" ADD CONSTRAINT "case_statuses_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToWeapon" ADD CONSTRAINT "_CaseToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToCrimeClassification" ADD CONSTRAINT "_CaseToCrimeClassification_B_fkey" FOREIGN KEY ("B") REFERENCES "crime_classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToVictim" ADD CONSTRAINT "_CaseToVictim_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToVictim" ADD CONSTRAINT "_CaseToVictim_B_fkey" FOREIGN KEY ("B") REFERENCES "personal_informations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToSuspect" ADD CONSTRAINT "_CaseToSuspect_A_fkey" FOREIGN KEY ("A") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseToSuspect" ADD CONSTRAINT "_CaseToSuspect_B_fkey" FOREIGN KEY ("B") REFERENCES "personal_informations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
