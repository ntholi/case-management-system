/*
  Warnings:

  - You are about to drop the column `entity` on the `audit_logs` table. All the data in the column will be lost.
  - Added the required column `model` to the `audit_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `audit_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "entity",
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "value" JSONB NOT NULL;
