/*
  Warnings:

  - You are about to drop the column `text` on the `Highlight` table. All the data in the column will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `BlogSource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endingPosition` to the `Highlight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingPosition` to the `Highlight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_bookmarkId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "content" TEXT,
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Highlight" DROP COLUMN "text",
ADD COLUMN     "endingPosition" INTEGER NOT NULL,
ADD COLUMN     "startingPosition" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#000000',
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Note";

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_url_key" ON "BlogPost"("url");

-- CreateIndex
CREATE UNIQUE INDEX "BlogSource_url_key" ON "BlogSource"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_slug_key" ON "Bookmark"("slug");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
