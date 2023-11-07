/*
  Warnings:

  - Made the column `lat` on table `Factory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lng` on table `Factory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Factory" ALTER COLUMN "lat" SET NOT NULL,
ALTER COLUMN "lng" SET NOT NULL;
