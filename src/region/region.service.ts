import { Injectable } from '@nestjs/common';
import { Region } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}
  async getAllRegion(): Promise<Region[]> {
    return await this.prisma.region.findMany();
  }
}
