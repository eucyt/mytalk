import { INestApplication, ValidationPipe } from '@nestjs/common';
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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true })); // for class-validator
    await app.init();
  });

  it('NG /register (POST): No displayName', async () => {
    const body = {
      email: 'test.e2e@test.com',
      password: 'e2ePassword!',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(400);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('NG /register (POST): No email', async () => {
    const body = {
      displayName: 'test_name',
      password: 'e2ePassword!',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(400);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('NG /register (POST): No password', async () => {
    const body = {
      displayName: 'test_name',
      email: 'test.e2e@test.com',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(400);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('NG /register (POST): Existed email', async () => {
    const body: RegisterRequest = {
      displayName: 'test_name',
      email: alice.email,
      password: 'e2ePassword!',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(400);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('NG /register (POST): Short displayName', async () => {
    const body: RegisterRequest = {
      displayName: 'Aa',
      email: 'test.e2e@test.com',
      password: 'e2ePassword!',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(400);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('NG /register (POST): Short password', async () => {
    const body: RegisterRequest = {
      displayName: 'test_name',
      email: 'test.e2e@test.com',
      password: 'Pass!',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(400);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('OK /register (POST)', async () => {
    const body: RegisterRequest = {
      displayName: 'test_name',
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

  it('NG /login (POST): Incorrect email', async () => {
    const body: LoginRequest = {
      email: alice.email + 'Incorrect',
      password: alice.password,
    };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(401);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('NG /login (POST): Incorrect password', async () => {
    const body: LoginRequest = {
      email: alice.email,
      password: alice.password + 'Incorrect',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(401);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('NG /login (POST): Incorrect email and password', async () => {
    const body: LoginRequest = {
      email: alice.email + 'Incorrect',
      password: alice.password + 'Incorrect',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(401);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('OK /register (POST) and /login (POST)', async () => {
    const body: RegisterRequest = {
      displayName: 'regi_login',
      email: 'register.login@test.com',
      password: 'RLPassword!',
    };
    await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: body.email, password: body.password });
    expect(loginRes.status).toEqual(201);
    expect(loginRes.body).toHaveProperty('accessToken');
    expect(loginRes.body).toHaveProperty('refreshToken');
  });

  // TODO: add other test cases
});
