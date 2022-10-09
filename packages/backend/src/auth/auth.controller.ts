import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    const tokens = await this.authService.login(
      loginRequest.email,
      loginRequest.password,
    );
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('/access-token')
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

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async isAuthenticated() {
    return;
  }
}
