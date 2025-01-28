/*
  Warnings:

  - You are about to drop the column `stackTracePath` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "stackTracePath",
ADD COLUMN     "stackTraceReport" TEXT;
