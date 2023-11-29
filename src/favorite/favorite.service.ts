import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Favorite } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDto } from './dto/favorite.dto';
import { Msg } from './interfaces/favorite.interface';

@Injectable()
export class FavoriteService {
  constructor(
    private prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async getFavorite(dto: FavoriteDto): Promise<Favorite> {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId: dto.userId,
        factoryId: dto.factoryId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('not found');
    }
    return favorite;
  }

  async registerFavorite(dto: FavoriteDto): Promise<Msg> {
    try {
      await this.prisma.favorite.create({
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw new ForbiddenException(
        'ログインしてからもう一度登録をしてください。',
      );
    }
    return { message: 'ok' };
  }
  async deleteFavorite(dto: FavoriteDto): Promise<Msg> {
    try {
      await this.prisma.favorite.delete({
        where: {
          userId_factoryId: {
            userId: dto.userId,
            factoryId: dto.factoryId,
          },
        },
      });
      return { message: 'ok' };
    } catch (error) {
      throw new ForbiddenException(
        'ログインしてからもう一度登録解除をしてください。',
      );
    }
  }
}
