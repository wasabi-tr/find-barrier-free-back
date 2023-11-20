import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Factory } from '@prisma/client';
import { FactoryService } from './factory.service';
import { Request } from 'express';
import { CreateFactoryDto } from './dto/create-factory.dto';
// import { AuthGuard } from '@nestjs/passport';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Get(':id')
  getFactory(@Param('id', ParseUUIDPipe) id: string): Promise<Factory> {
    console.log('getFactory');

    return this.factoryService.getFactory(id);
  }

  @Get()
  getFactories(): Promise<Factory[]> {
    console.log('getFactories');
    return this.factoryService.getFactories();
  }

  @UseGuards(AuthGuard)
  @Post()
  async createFactory(
    @Req() req: Request,
    @Body() dto: CreateFactoryDto,
  ): Promise<Factory> {
    const factory = await this.factoryService.createFactory(dto);

    return factory;
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateFactory(@Body() dto: UpdateFactoryDto): Promise<Factory> {
    const factory = await this.factoryService.updateFactory(dto);
    return factory;
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteFactory(@Body() id: string): Promise<Factory> {
    const deletedFactory = await this.factoryService.deleteFactory(id);
    return deletedFactory;
  }
}
