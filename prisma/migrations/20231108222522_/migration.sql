-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "imageUrl" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT;
