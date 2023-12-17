import { Injectable } from '@nestjs/common';
import { Factory, Feature, Genre } from '@prisma/client';
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
    return this.prisma.factory.findMany({
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        features: {
          include: {
            feature: true,
          },
        },
      },
    });
  }
  async getFactory(id: string): Promise<Factory> {
    return this.prisma.factory.findUnique({
      where: { id },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        features: {
          include: {
            feature: true,
          },
        },
      },
    });
  }
  async getFactoryByFavorite(userId: string): Promise<Factory[]> {
    const factories = await this.prisma.factory.findMany({
      where: {
        favoritedBy: {
          some: {
            userId,
          },
        },
      },
    });
    return factories;
  }
  async createFactory(dto: CreateFactoryDto): Promise<Factory> {
    const address = `${dto.prefecture}${dto.city}${dto.addressDetail}`;
    const location = await this.getLocation(address);
    const factory = await this.prisma.factory.create({
      data: {
        userId: dto.userId,
        name: dto.name,
        title: dto.title,
        description: dto.description,
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
  async deleteFactory(id: string) {
    return this.prisma.factory.delete({ where: { id } });
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
  async getFactoryGenres(factoryId: string): Promise<Genre[]> {
    const data = await this.prisma.factory.findMany({
      where: {
        id: factoryId,
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    const genres = data
      .map((item) => item.genres.map((genre) => genre.genre))
      .flat();

    return genres;
  }
  async createFactoryGenre(factoryId: string, genreIds: string[]) {
    for (const genreId of genreIds) {
      await this.prisma.factoryGenre.create({
        data: {
          factoryId,
          genreId,
        },
      });
    }
  }
  async getFactoryFeatures(factoryId): Promise<Feature[]> {
    const data = await this.prisma.factory.findMany({
      where: {
        id: factoryId,
      },
      include: {
        features: {
          include: {
            feature: true,
          },
        },
      },
    });
    const features = data
      .map((item) => item.features.map((feature) => feature.feature))
      .flat();
    return features;
  }

  async createFactoryFeature(factoryId: string, featureIds: string[]) {
    for (const featureId of featureIds) {
      await this.prisma.factoryFeature.create({
        data: {
          factoryId,
          featureId,
        },
      });
    }
  }
  async getAllGenres(): Promise<Genre[]> {
    return await this.prisma.genre.findMany();
  }
  async getAllFeature(): Promise<Feature[]> {
    return await this.prisma.feature.findMany();
  }
}
