/*
  Warnings:

  - You are about to drop the column `content_type` on the `object_file` table. All the data in the column will be lost.
  - Added the required column `mimetype` to the `object_file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "object_file" DROP COLUMN "content_type",
ADD COLUMN     "mimetype" TEXT NOT NULL;
