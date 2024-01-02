/*
  Warnings:

  - You are about to drop the column `prefecture` on the `Factory` table. All the data in the column will be lost.
  - Made the column `prefectureSlug` on table `Factory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Factory" DROP CONSTRAINT "Factory_prefectureSlug_fkey";

-- AlterTable
ALTER TABLE "Factory" DROP COLUMN "prefecture",
ALTER COLUMN "prefectureSlug" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Factory" ADD CONSTRAINT "Factory_prefectureSlug_fkey" FOREIGN KEY ("prefectureSlug") REFERENCES "Prefecture"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
