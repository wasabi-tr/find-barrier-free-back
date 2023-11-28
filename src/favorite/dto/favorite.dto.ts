import { IsNotEmpty, IsString } from 'class-validator';
export class FavoriteDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  factoryId: string;
}
