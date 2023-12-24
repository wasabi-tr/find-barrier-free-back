import { IsNotEmpty, IsString } from 'class-validator';
export class DeleteReviewDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
}
