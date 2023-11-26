import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsOptional()
  nickName?: string;
  @IsString()
  @IsOptional()
  description?: string;
}
