/*
  Warnings:

  - You are about to drop the column `birthday` on the `person` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_id_person_fkey";

-- AlterTable
ALTER TABLE "person" DROP COLUMN "birthday";

-- DropTable
DROP TABLE "address";
