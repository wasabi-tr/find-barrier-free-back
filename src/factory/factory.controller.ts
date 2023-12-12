import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Factory, Feature, Genre } from '@prisma/client';
import { FactoryService } from './factory.service';
import { Request } from 'express';
import { CreateFactoryDto } from './dto/create-factory.dto';
// import { AuthGuard } from '@nestjs/passport';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}
  @Get()
  getFactories(): Promise<Factory[]> {
    console.log('getFactories');
    return this.factoryService.getFactories();
  }
  @Get('/genres')
  getAllGenres(): Promise<Genre[]> {
    console.log('getAllGenres');
    return this.factoryService.getAllGenres();
  }

  @Get('/features')
  getAllFeature(): Promise<Genre[]> {
    console.log('getAllFeature');
    return this.factoryService.getAllFeature();
  }
  @UseGuards(AuthGuard)
  @Get('/favorite')
  async getFactoryByFavorite(
    @Query('userId') userId: string,
    @Res() response,
  ): Promise<Factory[]> {
    try {
      const factories = await this.factoryService.getFactoryByFavorite(userId);
      return response.status(HttpStatus.OK).json(factories);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  getFactory(@Param('id', ParseUUIDPipe) id: string): Promise<Factory> {
    console.log('getFactory');

    return this.factoryService.getFactory(id);
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

  @Get('/genre/:id')
  getFactoryGenres(@Param('id', ParseUUIDPipe) id: string): Promise<Genre[]> {
    console.log('getFactoryGenres');

    return this.factoryService.getFactoryGenres(id);
  }
  @Get('/feature/:id')
  getFactoryFeature(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Feature[]> {
    console.log('getFactoryFeatures');

    return this.factoryService.getFactoryFeatures(id);
  }
}
