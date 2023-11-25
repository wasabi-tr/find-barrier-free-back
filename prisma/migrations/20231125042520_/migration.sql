/*
  Warnings:

  - You are about to drop the `AccessibilityFeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FactoryToAccessibilityFeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenreToFactory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FactoryToAccessibilityFeature" DROP CONSTRAINT "FactoryToAccessibilityFeature_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "FactoryToAccessibilityFeature" DROP CONSTRAINT "FactoryToAccessibilityFeature_featureId_fkey";

-- DropForeignKey
ALTER TABLE "GenreToFactory" DROP CONSTRAINT "GenreToFactory_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "GenreToFactory" DROP CONSTRAINT "GenreToFactory_genreId_fkey";

-- DropTable
DROP TABLE "AccessibilityFeature";

-- DropTable
DROP TABLE "FactoryToAccessibilityFeature";

-- DropTable
DROP TABLE "GenreToFactory";

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FactoryGenre" (
    "genreId" TEXT NOT NULL,
    "factoryId" TEXT NOT NULL,

    CONSTRAINT "FactoryGenre_pkey" PRIMARY KEY ("genreId","factoryId")
);

-- CreateTable
CREATE TABLE "FactoryFeature" (
    "featureId" TEXT NOT NULL,
    "factoryId" TEXT NOT NULL,

    CONSTRAINT "FactoryFeature_pkey" PRIMARY KEY ("featureId","factoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feature_id_key" ON "Feature"("id");

-- AddForeignKey
ALTER TABLE "FactoryGenre" ADD CONSTRAINT "FactoryGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactoryGenre" ADD CONSTRAINT "FactoryGenre_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactoryFeature" ADD CONSTRAINT "FactoryFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactoryFeature" ADD CONSTRAINT "FactoryFeature_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
