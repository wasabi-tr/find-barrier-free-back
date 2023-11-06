import { Injectable } from '@nestjs/common';
import { Factory } from '@prisma/client';
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
        addressDetail: dto.addressDetail,
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
    for (const genreId of genreIds) {
      await this.prisma.genreToFactory.create({
        data: {
          factoryId,
          genreId,
        },
      });
    }
  }

  async createAccessibilityToFactory(factoryId: string, featureIds: string[]) {
    for (const featureId of featureIds) {
      await this.prisma.factoryToAccessibilityFeature.create({
        data: {
          factoryId,
          featureId,
        },
      });
    }
  }
}
