import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  const email = 'test@test.com';
  const password = 'Password!';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    prismaService.user.findUnique = jest.fn().mockReturnValueOnce({
      id: 12345,
      displayName: 'test user',
      email,
      password: await bcrypt.hash(password, 10),
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user', async () => {
    expect(await service.validateUser(email, password)).toEqual(true);
  });

  it('should not validate user that has incorrect password', async () => {
    expect(await service.validateUser(email, 'WrongPassword')).toEqual(false);
  });
});
