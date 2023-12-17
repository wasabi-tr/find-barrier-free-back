-- AlterTable
ALTER TABLE "Factory" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Factory" ADD CONSTRAINT "Factory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
