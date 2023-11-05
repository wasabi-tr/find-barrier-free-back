import { Controller, Get, Post, Req } from '@nestjs/common';
import { Factory } from '@prisma/client';
import { FactoryService } from './factory.service';
import { Request } from 'express';

@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}
  @Get()
  getFactories(): Promise<Factory[]> {
    return this.factoryService.getFactories();
  }
  @Post()
  createFactory(@Req() req: Request): Promise<Factory> {
    return;
  }
}
