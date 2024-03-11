/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified",
DROP COLUMN "firstName",
DROP COLUMN "hashedPassword",
DROP COLUMN "lastName",
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "hashed_password" TEXT,
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_name" TEXT;
