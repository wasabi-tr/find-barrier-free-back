import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Request } from 'express';
import { DeleteReviewDto } from './dto/delete-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  createReview(@Body() dto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  updateReview(
    @Req() req: Request,
    @Body() dto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.updateReview(req.user.id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  deleteReview(
    @Req() req: Request,
    @Body() dto: DeleteReviewDto,
  ): Promise<Review> {
    return this.reviewService.deleteReview(req.user.id, dto);
  }
}
