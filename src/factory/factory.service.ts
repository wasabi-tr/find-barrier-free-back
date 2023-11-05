import { Injectable } from '@nestjs/common';
import { Factory, GenreToFactory } from '@prisma/client';
import { Msg } from 'src/auth/interfaces/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactoryDto } from './dto/create-factory.dto';

@Injectable()
export class FactoryService {
  constructor(private prisma: PrismaService) {}
  async getFactories(): Promise<Factory[]> {
    return this.prisma.factory.findMany();
  }

  async createFactory(dto: CreateFactoryDto): Promise<Factory> {
    const factory = await this.prisma.factory.create({
      data: {
        name: dto.name,
        zipcode: dto.zipcode,
        prefecture: dto.prefecture,
        city: dto.city,
        tel: dto.tel,
        businessHours: dto.businessHours,
        holidays: dto.holidays,
        siteUrl: dto.siteUrl,
        imageUrl: dto.imageUrl,
      },
    });
    return factory;
  }

  async createGenreToFactory(factoryId: string, genreIds: string[]) {
    console.log(factoryId);
    console.log(genreIds);

    for (const genreId of genreIds) {
      await this.prisma.genreToFactory.create({
        data: {
          factoryId,
          genreId,
        },
      });
    }
  }
}
