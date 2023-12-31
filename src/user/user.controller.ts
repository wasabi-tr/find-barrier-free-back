import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  @UseGuards(AuthGuard) //userのエンドポイントにjwtの認証を設定することができる
  @Get(':id')
  getUser(@Param() dto: GetUserDto): Promise<User> {
    return this.userService.getUser(dto);
  }
  @UseGuards(AuthGuard) //userのエンドポイントにjwtの認証を設定することができる
  @Patch()
  updateUser(@Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(dto);
  }
}
