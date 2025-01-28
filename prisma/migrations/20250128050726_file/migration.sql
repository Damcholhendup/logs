/*
  Warnings:

  - You are about to drop the column `stackTraceReport` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "stackTraceReport",
ADD COLUMN     "stackTracePath" TEXT;
