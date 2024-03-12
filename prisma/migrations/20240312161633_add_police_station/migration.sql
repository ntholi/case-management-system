-- CreateTable
CREATE TABLE "PoliceStation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "district" "District" NOT NULL,

    CONSTRAINT "PoliceStation_pkey" PRIMARY KEY ("id")
);
