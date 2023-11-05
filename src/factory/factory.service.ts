import { Injectable } from '@nestjs/common';
import { Factory } from '@prisma/client';
import { Msg } from 'src/auth/interfaces/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FactoryService {
  constructor(private prisma: PrismaService) {}
  async getFactories(): Promise<Factory[]> {
    return this.prisma.factory.findMany();
  }

  async createFactory(): Promise<Msg> {
    return { message: 'Created Factory !' };
  }
}
