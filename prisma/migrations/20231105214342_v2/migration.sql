-- DropForeignKey
ALTER TABLE "FactoryToAccessibilityFeature" DROP CONSTRAINT "FactoryToAccessibilityFeature_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "FactoryToAccessibilityFeature" DROP CONSTRAINT "FactoryToAccessibilityFeature_featureId_fkey";

-- DropForeignKey
ALTER TABLE "GenreToFactory" DROP CONSTRAINT "GenreToFactory_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "GenreToFactory" DROP CONSTRAINT "GenreToFactory_genreId_fkey";

-- AddForeignKey
ALTER TABLE "GenreToFactory" ADD CONSTRAINT "GenreToFactory_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreToFactory" ADD CONSTRAINT "GenreToFactory_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactoryToAccessibilityFeature" ADD CONSTRAINT "FactoryToAccessibilityFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "AccessibilityFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactoryToAccessibilityFeature" ADD CONSTRAINT "FactoryToAccessibilityFeature_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
