import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthController', () => {
  let authService: AuthService;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register', async () => {
    const user = {
      email: 'test@test.com',
      password: 'Password',
    };
    const result = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };
    jest.spyOn(authService, 'register').mockImplementation(async () => result);

    expect(await controller.register(user)).toEqual(result);
  });

  it('should login', async () => {
    const user = {
      email: 'test@test.com',
      password: 'Password',
    };
    const result = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };
    jest.spyOn(authService, 'login').mockImplementation(async () => result);

    expect(await controller.login(user)).toEqual(result);
  });

  it('should get access token by refresh token', async () => {
    const accessToken = 'access_token';
    const refreshToken = 'refresh_token';

    jest
      .spyOn(authService, 'renewAccessToken')
      .mockImplementation(async () => ({ accessToken }));

    expect(await controller.accessToken({ refreshToken })).toEqual({
      accessToken,
    });
  });
});
