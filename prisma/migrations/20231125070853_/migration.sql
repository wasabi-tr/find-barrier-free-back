/*
  Warnings:

  - Added the required column `description` to the `Factory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Factory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Factory" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
