/*
  Warnings:

  - Made the column `userId` on table `Factory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Factory" DROP CONSTRAINT "Factory_userId_fkey";

-- AlterTable
ALTER TABLE "Factory" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Factory" ADD CONSTRAINT "Factory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
