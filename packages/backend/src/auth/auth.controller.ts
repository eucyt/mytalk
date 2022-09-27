import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequest, RegisterResponse } from './auth.entity';
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
}
