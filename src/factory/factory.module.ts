import { Module } from '@nestjs/common';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FactoryController],
  providers: [FactoryService],
})
export class FactoryModule {}
