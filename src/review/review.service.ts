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
  async getReviewsByUserId(userId: string): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { userId: userId },
      include: {
        factory: true,
      },
    });
  }
  async getReviewByUserIdAndFactoryId({
    userId,
    factoryId,
  }: {
    userId: string;
    factoryId: string;
  }): Promise<Review> {
    console.log('getReviewByUserIdAndFactoryId');
    const review = await this.prisma.review.findFirst({
      where: { userId, factoryId },
      include: {
        factory: true,
      },
    });
    if (!review) {
      throw new NotFoundException('レビューはありません。');
    }
    return review;
  }
  async createReview(dto: CreateReviewDto): Promise<Review> {
    return this.prisma.review.upsert({
      where: {
        // レビューを一意に識別するフィールド
        userId_factoryId: {
          userId: dto.userId,
          factoryId: dto.factoryId,
        },
      },
      update: {
        // 更新するフィールド
        title: dto.title,
        comment: dto.comment,
        imageUrl: dto.imageUrl,
      },
      create: {
        // 新しいレビューを作成する場合のデータ
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
    });
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
  async deleteReview(dto: DeleteReviewDto): Promise<void> {
    const review = await this.prisma.review.findUnique({
      where: { id: dto.id },
    });
    // レビューが存在しない場合は例外を投げます。
    if (!review) {
      throw new NotFoundException('口コミは登録されていません。');
    }
    // 現在のユーザーIDとレビューのユーザーIDを比較します。
    if (review.userId !== dto.userId) {
      throw new ForbiddenException(
        '削除しようとしている口コミは他のユーザーの口コミです。',
      );
    }

    await this.prisma.review.delete({
      where: { id: dto.id },
    });
  }
}
