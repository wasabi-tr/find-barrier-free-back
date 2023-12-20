import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Request } from 'express';
import { DeleteReviewDto } from './dto/delete-review.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Get('/factory/:factoryId')
  getReviewsByFactoryId(
    @Param('factoryId', ParseUUIDPipe) factoryId: string,
  ): Promise<Review[]> {
    return this.reviewService.getReviewsByFactoryId(factoryId);
  }

  // @UseGuards(AuthGuard)
  @Get('/user/:userId')
  getReviewByUserId(@Param('userId') userId: string): Promise<Review[]> {
    return this.reviewService.getReviewsByUserId(userId);
  }
  // @UseGuards(AuthGuard)
  @Get('/user-and-factory')
  getReviewsByUserIdAndFactoryId(
    @Query('userId') userId: string,
    @Query('factoryId') factoryId: string,
  ): Promise<Review> {
    console.log('getReviewByUserIdAndFactoryId');
    return this.reviewService.getReviewByUserIdAndFactoryId({
      userId,
      factoryId,
    });
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  createReview(@Body() dto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(dto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update')
  updateReview(
    @Req() req: Request,
    @Body() dto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.updateReview(req.user.id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  deleteReview(
    @Req() req: Request,
    @Body() dto: DeleteReviewDto,
  ): Promise<Review> {
    return this.reviewService.deleteReview(req.user.id, dto);
  }
}
