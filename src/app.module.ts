import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FactoryModule } from './factory/factory.module';
import { ReviewModule } from './review/review.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    FactoryModule,
    ReviewModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
