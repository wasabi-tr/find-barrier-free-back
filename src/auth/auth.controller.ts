import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Csrf, Jwt, Msg } from './interfaces/auth.interface';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
  }
  // @Post('/signup')
  // signup(@Body() dto: AuthDto): Promise<Msg> {
  //   return this.authService.signUp(dto);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Post('/login')
  // async login(
  //   @Body() dto: AuthDto,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Msg> {
  //   const jwt = await this.authService.login(dto);
  //   //サーバーサイドからjwtをcookieに設定する
  //   res.cookie('access_token', jwt.accessToken, {
  //     httpOnly: true,
  //     secure: true, // 本番環境ではtrue
  //     sameSite: 'none',
  //     path: '/',
  //   });
  //   return { message: 'ok' };
  // }

  // @HttpCode(HttpStatus.OK)
  // @Post('/logout')
  // async logout(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Msg> {
  //   res.cookie('access_token', '', {
  //     httpOnly: true,
  //     secure: true, // 本番環境ではtrue
  //     sameSite: 'none',
  //     path: '/',
  //   });
  //   return { message: 'ok' };
  // }
}
