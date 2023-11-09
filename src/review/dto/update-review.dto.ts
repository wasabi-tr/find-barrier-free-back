import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateReviewDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsOptional()
  @IsString({ each: true })
  imageUrl?: string[];
}
