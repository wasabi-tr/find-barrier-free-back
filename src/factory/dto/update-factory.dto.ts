import { FactoryToAccessibilityFeature, GenreToFactory } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
export class UpdateFactoryDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
}
