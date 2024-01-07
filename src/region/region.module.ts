import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
