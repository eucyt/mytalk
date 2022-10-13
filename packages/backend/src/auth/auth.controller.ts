import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

import {
  AccessTokenResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  WithdrawRequest,
} from './auth.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() registerRequest: RegisterRequest,
  ): Promise<RegisterResponse> {
    const tokens = await this.authService.register(
      registerRequest.displayName,
      registerRequest.email,
      registerRequest.password,
    );
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('/login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginRequest: LoginRequest,
    @Req() req: { user: User },
  ): Promise<LoginResponse> {
    const tokens = await this.authService.login(req.user);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Put('/access-token')
  @UseGuards(JwtRefreshAuthGuard)
  async accessToken(
    @Req() req: { user: User; headers: { authorization: string } },
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.renewTokens(
      req.user,
      req.headers.authorization.replace('Bearer', '').trim(),
    );
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  isAuthenticated() {
    return;
  }

  @Post('/logout')
  @HttpCode(200)
  @UseGuards(JwtRefreshAuthGuard)
  async logout(@Req() req: { user: User }) {
    await this.authService.logout(req.user);
  }

  @Delete('/withdraw')
  @UseGuards(LocalAuthGuard)
  async withdraw(
    @Req() req: { user: User },
    @Body() withdrawRequest: WithdrawRequest,
  ) {
    return await this.authService.withdraw(req.user);
  }
}
