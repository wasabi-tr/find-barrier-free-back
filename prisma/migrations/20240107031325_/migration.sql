/*
  Warnings:

  - Made the column `slug` on table `Feature` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Genre` required. This step will fail if there are existing NULL values in that column.
  - Made the column `regionId` on table `Prefecture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Region` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Prefecture" DROP CONSTRAINT "Prefecture_regionId_fkey";

-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Prefecture" ALTER COLUMN "regionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Region" ALTER COLUMN "slug" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Prefecture" ADD CONSTRAINT "Prefecture_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
