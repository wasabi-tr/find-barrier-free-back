import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(dto: GetUserDto): Promise<User> {
    console.log(dto.id);

    const user = await this.prisma.user.findUnique({
      where: { id: dto.id },
    });
    return user;
  }
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: dto.id,
        nickName: dto.nickName,
      },
    });
    return user;
  }

  async updateUser(dto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
      },
    });
    return user;
  }
}
