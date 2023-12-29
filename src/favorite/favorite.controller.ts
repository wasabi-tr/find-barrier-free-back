import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FavoriteDto } from './dto/favorite.dto';
import { Msg } from './interfaces/favorite.interface';
import { Favorite } from '@prisma/client';

@Controller('favorite')
@UseGuards(AuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async getFavorites(
    @Query('userId') userId: string,
    @Query('factoryId') factoryId: string,
  ): Promise<Favorite> {
    return this.favoriteService.getFavorite({ userId, factoryId });
  }

  @Get('/user')
  async getAllFavoritesByUserId(
    @Query('userId') userId: string,
  ): Promise<Favorite[]> {
    return this.favoriteService.getAllFavoriteByUserId({ userId });
  }

  @Post()
  async registerFavorite(@Body() dto: FavoriteDto): Promise<Msg> {
    return this.favoriteService.registerFavorite(dto);
  }
  @Delete()
  async deleteFavorite(@Body() dto: FavoriteDto): Promise<Msg> {
    return this.favoriteService.deleteFavorite(dto);
  }
}
