import { Controller, Get } from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from '@prisma/client';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
  @Get()
  getAllRegion(): Promise<Region[]> {
    return this.regionService.getAllRegion();
  }
}
