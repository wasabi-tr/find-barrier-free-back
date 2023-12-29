/*
  Warnings:

  - You are about to drop the column `prefectureId` on the `Factory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Factory" DROP CONSTRAINT "Factory_prefectureId_fkey";

-- AlterTable
ALTER TABLE "Factory" DROP COLUMN "prefectureId",
ADD COLUMN     "prefectureSlug" TEXT;

-- AddForeignKey
ALTER TABLE "Factory" ADD CONSTRAINT "Factory_prefectureSlug_fkey" FOREIGN KEY ("prefectureSlug") REFERENCES "Prefecture"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
