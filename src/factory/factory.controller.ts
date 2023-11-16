import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Factory } from '@prisma/client';
import { FactoryService } from './factory.service';
import { Request } from 'express';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateFactoryDto } from './dto/update-factory.dto';

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

    return factory;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateFactory(@Body() dto: UpdateFactoryDto): Promise<Factory> {
    const factory = await this.factoryService.updateFactory(dto);
    return factory;
  }
}
