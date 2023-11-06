/*
  Warnings:

  - You are about to drop the column `bisinessHours` on the `Factory` table. All the data in the column will be lost.
  - You are about to drop the `Purpose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurposeToFactory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Factory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PurposeToFactory" DROP CONSTRAINT "PurposeToFactory_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "PurposeToFactory" DROP CONSTRAINT "PurposeToFactory_purposeId_fkey";

-- AlterTable
ALTER TABLE "Factory" DROP COLUMN "bisinessHours",
ADD COLUMN     "businessHours" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Purpose";

-- DropTable
DROP TABLE "PurposeToFactory";
