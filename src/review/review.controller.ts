import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  createReview(@Body() dto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(dto);
  }
}
