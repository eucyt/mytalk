import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import {
  LoginRequest,
  RegisterRequest,
  WithdrawRequest,
} from '../src/auth/auth.entity';
import { AuthModule } from '../src/auth/auth.module';
import { resetDatabase } from './detabese-reset';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const alice = {
    id: 1,
    email: 'test.alice@test.com',
    displayName: 'Alice',
    password: 'Password!0Alice',
    refreshToken: 'refreshTokenAlice',
  };

  beforeAll(async () => {
    resetDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true })); // for class-validator
    await app.init();
  });

  it('NG /auth/register (POST): No displayName', async () => {
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

  it('NG /auth/register (POST): No email', async () => {
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

  it('NG /auth/register (POST): No password', async () => {
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

  it('NG /auth/register (POST): Existed email', async () => {
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

  it('NG /auth/register (POST): Short displayName', async () => {
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

  it('NG /auth/register (POST): Short password', async () => {
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

  it('OK /auth/register (POST)', async () => {
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

  it('OK /auth/login (POST)', async () => {
    const body: LoginRequest = {
      email: alice.email,
      password: alice.password,
    };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('NG /auth/login (POST): Incorrect email', async () => {
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

  it('NG /auth/login (POST): Incorrect password', async () => {
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

  it('NG /auth/login (POST): Incorrect email and password', async () => {
    const body: LoginRequest = {
      email: alice.email + 'Incorrect',
      password: alice.password + 'Incorrect',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);
    expect(res.status).toEqual(401);
    expect(res.body).not.toHaveProperty('user');
  });

  it('OK /auth (POST)', async () => {
    const body: LoginRequest = {
      email: alice.email,
      password: alice.password,
    };
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);

    const res = await request(app.getHttpServer())
      .get('/auth')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'bearer ' + loginRes.body.accessToken);

    expect(res.status).toEqual(200);

    expect(res.body.user.id).toEqual(alice.id);

    expect(res.body.user.displayName).toEqual(alice.displayName);

    expect(res.body.user.email).toEqual(alice.email);
  });

  it('OK /auth (POST): Use register', async () => {
    const body: RegisterRequest = {
      displayName: 'R_name',
      email: 'R.test@test.com',
      password: 'RPassword!',
    };
    const registerRes = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);

    const res = await request(app.getHttpServer())
      .get('/auth')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'bearer ' + registerRes.body.accessToken);

    expect(res.status).toEqual(200);

    expect(res.body.user.displayName).toEqual(body.displayName);

    expect(res.body.user.email).toEqual(body.email);
  });

  it('NG /auth (POST): Invalid accessToken', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer InvalidToken');

    expect(res.status).toEqual(401);
    expect(res.body).not.toHaveProperty('displayName');
    expect(res.body).not.toHaveProperty('email');
  });

  it('OK /auth/access-token (POST)', async () => {
    const body: LoginRequest = {
      email: alice.email,
      password: alice.password,
    };
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);

    const renewTokensRes = await request(app.getHttpServer())
      .put('/auth/access-token')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'Bearer ' + loginRes.body.refreshToken);
    expect(renewTokensRes.status).toEqual(200);
    expect(renewTokensRes.body).toHaveProperty('accessToken');
    expect(renewTokensRes.body).toHaveProperty('refreshToken');
  });

  it('NG /auth/access-token (POST): Invalid token', async () => {
    const res = await request(app.getHttpServer())
      .put('/auth/access-token')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer InvalidToken');

    expect(res.status).toEqual(401);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('OK /auth/logout (POST)', async () => {
    const body: LoginRequest = {
      email: alice.email,
      password: alice.password,
    };
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);

    const res = await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'Bearer ' + loginRes.body.refreshToken);

    expect(res.status).toEqual(200);
    expect(res.body).not.toHaveProperty('accessToken');
    expect(res.body).not.toHaveProperty('refreshToken');
  });

  it('NG /auth/logout (POST): Invalid token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer InvalidToken');

    expect(res.status).toEqual(401);
  });

  it('OK /auth/withdraw (DELETE)', async () => {
    const body: WithdrawRequest = {
      email: 'test.e2e@test.com',
      password: 'e2ePassword!',
    };

    const withdrawRes = await request(app.getHttpServer())
      .delete('/auth/withdraw')
      .set('Accept', 'application/json')
      .send(body);

    expect(withdrawRes.status).toEqual(200);
    expect(withdrawRes.body).not.toHaveProperty('accessToken');
    expect(withdrawRes.body).not.toHaveProperty('refreshToken');

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);
    expect(loginRes.status).toEqual(401);
  });

  it('NG /auth/withdraw (DELETE)', async () => {
    const body: WithdrawRequest = {
      email: 'test.no.exist@test.com',
      password: 'e2ePassword!',
    };

    const withdrawRes = await request(app.getHttpServer())
      .delete('/auth/withdraw')
      .set('Accept', 'application/json')
      .send(body);

    expect(withdrawRes.status).toEqual(401);
  });

  /*
      join e2e test to check auth
  */
  it('OK Should register and login', async () => {
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
    expect(loginRes.status).toEqual(200);
    expect(loginRes.body).toHaveProperty('accessToken');
    expect(loginRes.body).toHaveProperty('refreshToken');
  });

  it('OK access-token return correct token', async () => {
    const body: LoginRequest = {
      email: alice.email,
      password: alice.password,
    };
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(body);

    const renewTokensRes = await request(app.getHttpServer())
      .put('/auth/access-token')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'Bearer ' + loginRes.body.refreshToken);

    const renewTokensAgainRes = await request(app.getHttpServer())
      .put('/auth/access-token')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'Bearer ' + renewTokensRes.body.refreshToken);
    expect(renewTokensAgainRes.status).toEqual(200);

    const res = await request(app.getHttpServer())
      .get('/auth')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'bearer ' + renewTokensAgainRes.body.accessToken);

    expect(res.status).toEqual(200);
  });

  it('OK Register return correct token', async () => {
    const body: RegisterRequest = {
      displayName: 'AR_name',
      email: 'AR.test@test.com',
      password: 'ARPassword!',
    };
    const registerRes = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(body);

    const renewTokensRes = await request(app.getHttpServer())
      .put('/auth/access-token')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'Bearer ' + registerRes.body.refreshToken);
    expect(renewTokensRes.status).toEqual(200);
    expect(renewTokensRes.body).toHaveProperty('accessToken');
    expect(renewTokensRes.body).toHaveProperty('refreshToken');

    const res = await request(app.getHttpServer())
      .get('/auth')
      .set('Accept', 'application/json')
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .set('Authorization', 'bearer ' + registerRes.body.accessToken);

    expect(res.status).toEqual(200);
  });
});
