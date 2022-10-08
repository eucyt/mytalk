import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { LoginRequest, RegisterRequest } from '../src/auth/auth.entity';
import { AuthModule } from '../src/auth/auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const alice = {
    email: 'test.alice@test.com',
    displayName: 'Alice',
    password: 'Password!0Alice',
    refreshToken: 'refreshTokenAlice',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('OK /register (POST)', async () => {
    const body: RegisterRequest = {
      displayName: 'test_displayName',
      email: 'test.e2e@test.com',
      password: 'e2ePassword!',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('OK /login (POST)', async () => {
    const body: LoginRequest = {
      email: alice.email,
      password: alice.password,
    };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });

  // TODO: add other test cases
});
