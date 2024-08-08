/*
  Warnings:

  - Added the required column `type` to the `object` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "object" ADD COLUMN     "type" TEXT NOT NULL;
