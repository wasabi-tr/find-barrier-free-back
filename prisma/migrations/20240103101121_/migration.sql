-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_factoryId_fkey";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
