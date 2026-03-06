/*
  Warnings:

  - A unique constraint covering the columns `[userId,serviceId]` on the table `BookMark` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BookMark" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "BookMark_serviceId_idx" ON "BookMark"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "BookMark_userId_serviceId_key" ON "BookMark"("userId", "serviceId");
