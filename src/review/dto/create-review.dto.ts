import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString({ each: true })
  imageUrl?: string[];

  @IsNotEmpty()
  @IsString()
  factoryId: string;
}
