/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,factoryId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Factory" ADD COLUMN     "prefectureId" TEXT;

-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "slug" TEXT;

-- CreateTable
CREATE TABLE "Prefecture" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_id_key" ON "Prefecture"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_name_key" ON "Prefecture"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Prefecture_slug_key" ON "Prefecture"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_slug_key" ON "Feature"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_factoryId_key" ON "Review"("userId", "factoryId");

-- AddForeignKey
ALTER TABLE "Factory" ADD CONSTRAINT "Factory_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
