import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

import {
  AccessTokenRequest,
  AccessTokenResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.entity';
import { AuthService } from './auth.service';

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
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() loginRequest: LoginRequest,
    @Req() request: { user: User },
  ): Promise<LoginResponse> {
    const tokens = await this.authService.login(request.user);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('/accessToken')
  async accessToken(
    @Body() accessTokenRequest: AccessTokenRequest,
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.renewTokens(
      accessTokenRequest.refreshToken,
    );
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
