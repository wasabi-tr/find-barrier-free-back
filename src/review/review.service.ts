import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    private prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}
  async getReviews(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }
  async getReviewsByFactoryId(factoryId: string): Promise<Review[]> {
    return this.prisma.review.findMany({ where: { factoryId: factoryId } });
  }
  async createReview(dto: CreateReviewDto): Promise<Review> {
    const createData = {
      data: {
        title: dto.title,
        comment: dto.title,
        user: {
          connect: {
            id: dto.userId,
          },
        },
        imageUrl: dto.imageUrl,
        factory: {
          connect: {
            id: dto.factoryId,
          },
        },
      },
    };
    return this.prisma.review.create(createData);
  }
}
