import { FactoryToAccessibilityFeature, GenreToFactory } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
export class CreateFactoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  prefecture: string;

  @IsNotEmpty()
  @IsString()
  city: string;

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
  genresIds?: string[];

  @IsOptional()
  @IsArray()
  factoryToAccessibilityFeatureIds?: string[];
}
