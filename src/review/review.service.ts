import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateReviewDto } from './dto/update-review.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';

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
    return this.prisma.review.findMany({
      where: { factoryId: factoryId },
      include: {
        user: true,
      },
    });
  }
  async createReview(dto: CreateReviewDto): Promise<Review> {
    const createData = {
      data: {
        title: dto.title,
        comment: dto.comment,
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

  async updateReview(
    currentUserId: string,
    dto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: { id: dto.id },
    });
    // レビューが存在しない場合は例外を投げます。
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    // 現在のユーザーIDとレビューのユーザーIDを比較します。
    if (review.userId !== currentUserId) {
      throw new ForbiddenException(
        'You do not have permission to update this review',
      );
    }

    const updateData = {
      data: {
        title: dto.title,
        comment: dto.comment,
        imageUrl: dto.imageUrl,
      },
    };
    return this.prisma.review.update({
      where: { id: dto.id },
      ...updateData,
    });
  }
  async deleteReview(
    currentUserId: string,
    dto: DeleteReviewDto,
  ): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: { id: dto.id },
    });
    // レビューが存在しない場合は例外を投げます。
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    // 現在のユーザーIDとレビューのユーザーIDを比較します。
    if (review.userId !== currentUserId) {
      throw new ForbiddenException(
        'You do not have permission to delete this review',
      );
    }

    return this.prisma.review.delete({
      where: { id: dto.id },
    });
  }
}
