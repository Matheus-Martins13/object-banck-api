/*
  Warnings:

  - Added the required column `content_type` to the `object_file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `object_file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "object_file" ADD COLUMN     "content_type" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;
