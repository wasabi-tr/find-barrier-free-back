/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Region` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "Region"("slug");
