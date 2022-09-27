import { Body, Controller, Post } from '@nestjs/common';
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
    return this.authService.register(
      registerRequest.email,
      registerRequest.password,
    );
  }

  @Post('/login')
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginRequest.email, loginRequest.password);
  }

  @Post('/accessToken')
  async accessToken(
    @Body() accessTokenRequest: AccessTokenRequest,
  ): Promise<AccessTokenResponse> {
    return this.authService.renewAccessToken(accessTokenRequest.refreshToken);
  }
}
