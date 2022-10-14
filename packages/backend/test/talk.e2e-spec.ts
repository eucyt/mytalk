import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { TalkModule } from '../src/talk/talk.module';

describe('TalkController (e2e)', () => {
  let app: INestApplication;
  const alice = {
    email: 'test.alice@test.com',
    displayName: 'Alice',
    password: 'Password!0Alice',
    refreshToken: 'refreshTokenAlice',
  };
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TalkModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true })); // for class-validator
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: alice.email,
        password: alice.password,
      });
    accessToken = loginRes.body.accessToken as string;
  });

  it('OK /talks (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + accessToken);
    expect(res.status).toEqual(200);

    expect(res.body.length).toEqual(3);
  });

  it('OK /talks (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/talks')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + accessToken);
    expect(res.status).toEqual(201);

    expect(res.body).toHaveProperty('id');
  });
});
