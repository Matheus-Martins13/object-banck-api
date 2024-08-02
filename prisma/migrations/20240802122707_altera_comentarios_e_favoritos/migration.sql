/*
  Warnings:

  - The primary key for the `comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id_comment` was added to the `comment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id_favorite` was added to the `favorite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "comment_id_object_key";

-- DropIndex
DROP INDEX "comment_id_user_key";

-- DropIndex
DROP INDEX "favorite_id_object_key";

-- DropIndex
DROP INDEX "favorite_id_user_key";

-- AlterTable
ALTER TABLE "comment" DROP CONSTRAINT "comment_pkey",
ADD COLUMN     "id_comment" TEXT NOT NULL,
ADD CONSTRAINT "comment_pkey" PRIMARY KEY ("id_comment");

-- AlterTable
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_pkey",
ADD COLUMN     "id_favorite" TEXT NOT NULL,
ADD CONSTRAINT "favorite_pkey" PRIMARY KEY ("id_favorite");
