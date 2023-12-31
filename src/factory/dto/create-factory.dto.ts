import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateFactoryDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  prefecture: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  addressDetail: string;

  @IsOptional()
  @IsString()
  tel?: string;

  @IsString()
  @IsOptional()
  businessHours?: string;

  @IsString()
  @IsOptional()
  holidays?: string;

  @IsString()
  @IsOptional()
  siteUrl?: string;

  @IsOptional()
  @IsArray()
  imageUrl?: string[];

  @IsOptional()
  @IsArray()
  genreIds?: string[];

  @IsOptional()
  @IsArray()
  featureIds?: string[];
}
