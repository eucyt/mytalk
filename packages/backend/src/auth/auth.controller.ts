import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import {
  AccessTokenResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
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
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginRequest: LoginRequest,
    @Req() req,
  ): Promise<LoginResponse> {
    const tokens = await this.authService.login(req.user);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('/access-token')
  @UseGuards(JwtRefreshAuthGuard)
  async accessToken(@Req() req): Promise<AccessTokenResponse> {
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
  async isAuthenticated() {
    return;
  }
}
