import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { PrismaModule } from '../prisma/prisma.module';

// TODO: should check mock parameters.
describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  const id = 12345;
  const displayName = 'test_user';
  const email = 'test@test.com';
  const password = 'Password!';
  const refreshToken = 'refresh_token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    const user = {
      id: 12345,
      displayName,
      email,
      password: await bcrypt.hash(password, 10),
      refreshToken: await bcrypt.hash(refreshToken, 10),
    };
    prismaService.user.findUnique = jest.fn().mockReturnValueOnce(user);
    prismaService.user.create = jest.fn().mockReturnValueOnce(user);
    prismaService.user.update = jest.fn().mockReturnValueOnce(user);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user', async () => {
    const result = await service.find(id);

    expect(result.id).toEqual(id);
    expect(result.displayName).toEqual(displayName);
    expect(result.email).toEqual(email);
    expect(await compare(password, result.password)).toEqual(true);
    expect(await compare(refreshToken, result.refreshToken)).toEqual(true);
  });

  it('should find user by email', async () => {
    const result = await service.findByEmail(email);

    expect(result.id).toEqual(id);
    expect(result.displayName).toEqual(displayName);
    expect(result.email).toEqual(email);
    expect(await compare(password, result.password)).toEqual(true);
    expect(await compare(refreshToken, result.refreshToken)).toEqual(true);
  });

  it('should create user', async () => {
    const result = await service.create({
      displayName,
      email,
      password,
      refreshToken,
    });

    expect(result.id).toEqual(id);
    expect(result.displayName).toEqual(displayName);
    expect(result.email).toEqual(email);
    expect(await compare(password, result.password)).toEqual(true);
    expect(await compare(refreshToken, result.refreshToken)).toEqual(true);
  });

  it('should update user', async () => {
    const result = await service.update({
      id,
      displayName,
      email,
      password,
      refreshToken,
    });

    expect(result.id).toEqual(id);
    expect(result.displayName).toEqual(displayName);
    expect(result.email).toEqual(email);
    expect(await compare(password, result.password)).toEqual(true);
    expect(await compare(refreshToken, result.refreshToken)).toEqual(true);
  });
});
