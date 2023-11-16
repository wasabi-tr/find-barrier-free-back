import { Injectable } from '@nestjs/common';
import { Factory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UpdateFactoryDto } from './dto/update-factory.dto';

@Injectable()
export class FactoryService {
  constructor(
    private prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}
  async getFactories(): Promise<Factory[]> {
    return this.prisma.factory.findMany();
  }

  async createFactory(dto: CreateFactoryDto): Promise<Factory> {
    const address = `${dto.prefecture}${dto.city}${dto.addressDetail}`;
    const location = await this.getLocation(address);
    const factory = await this.prisma.factory.create({
      data: {
        name: dto.name,
        zipcode: dto.zipcode,
        prefecture: dto.prefecture,
        city: dto.city,
        addressDetail: dto.addressDetail,
        lat: location.lat,
        lng: location.lng,
        tel: dto.tel,
        businessHours: dto.businessHours,
        holidays: dto.holidays,
        siteUrl: dto.siteUrl,
        imageUrl: dto.imageUrl,
      },
    });
    return factory;
  }
  async updateFactory(dto: UpdateFactoryDto): Promise<Factory> {
    const factory = await this.prisma.factory.update({
      where: { id: dto.id },
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
  async getLocation(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.config.get(
      'GEOCODING_API_KEY',
    )}`;

    try {
      const res = await axios.get(url);
      const location = res.data.results[0].geometry.location;
      return location;
    } catch (error) {
      console.error('Fetch error:', error);
    }
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
