/*
  Warnings:

  - A unique constraint covering the columns `[emaiverificationid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailverificadIn" TIMESTAMP(3),
ADD COLUMN     "emaiverificationid" TEXT,
ADD COLUMN     "expiracaoEmail" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_emaiverificationid_key" ON "User"("emaiverificationid");
