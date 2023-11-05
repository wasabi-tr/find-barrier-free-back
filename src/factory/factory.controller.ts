import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Factory } from '@prisma/client';
import { FactoryService } from './factory.service';
import { Request } from 'express';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}
  @Get()
  getFactories(): Promise<Factory[]> {
    return this.factoryService.getFactories();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createFactory(
    @Req() req: Request,
    @Body() dto: CreateFactoryDto,
  ): Promise<Factory> {
    const factory = await this.factoryService.createFactory(dto);
    await this.factoryService.createGenreToFactory(factory.id, dto.genresIds);
    return factory;
  }
}
