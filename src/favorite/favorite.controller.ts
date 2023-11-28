import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FavoriteDto } from './dto/favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @UseGuards(AuthGuard)
  @Post()
  async registerFavorite(@Body() dto: FavoriteDto) {
    return this.favoriteService.registerFavorite(dto);
  }
}
