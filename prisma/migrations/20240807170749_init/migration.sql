/*
  Warnings:

  - You are about to drop the column `id_category` on the `object` table. All the data in the column will be lost.
  - You are about to drop the column `id_subcategory` on the `object` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_collection` to the `object` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "object" DROP CONSTRAINT "object_id_category_fkey";

-- DropForeignKey
ALTER TABLE "object" DROP CONSTRAINT "object_id_subcategory_fkey";

-- DropForeignKey
ALTER TABLE "subcategory" DROP CONSTRAINT "subcategory_id_category_fkey";

-- AlterTable
ALTER TABLE "object" DROP COLUMN "id_category",
DROP COLUMN "id_subcategory",
ADD COLUMN     "id_collection" TEXT NOT NULL;

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "subcategory";

-- CreateTable
CREATE TABLE "collection" (
    "id_collection" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id_collection")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_name_key" ON "collection"("name");

-- AddForeignKey
ALTER TABLE "object" ADD CONSTRAINT "object_id_collection_fkey" FOREIGN KEY ("id_collection") REFERENCES "collection"("id_collection") ON DELETE CASCADE ON UPDATE CASCADE;
