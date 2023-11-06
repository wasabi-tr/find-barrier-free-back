/*
  Warnings:

  - You are about to drop the column `regionId` on the `Factory` table. All the data in the column will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `addressDetail` to the `Factory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Factory" DROP CONSTRAINT "Factory_regionId_fkey";

-- AlterTable
ALTER TABLE "Factory" DROP COLUMN "regionId",
ADD COLUMN     "addressDetail" TEXT NOT NULL;

-- DropTable
DROP TABLE "Region";
