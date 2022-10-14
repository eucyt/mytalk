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
  };
  const bob = {
    email: 'test.bob@test.com',
    displayName: 'Bob',
    password: 'Password!0Bob',
  };
  let aliceAccessToken: string;
  let bobAccessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TalkModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true })); // for class-validator
    await app.init();

    const loginAliceRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: alice.email,
        password: alice.password,
      });
    aliceAccessToken = loginAliceRes.body.accessToken as string;
    const loginBobRes = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: bob.email,
        password: bob.password,
      });
    bobAccessToken = loginBobRes.body.accessToken as string;
  });

  it('OK /talks (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken);
    expect(res.status).toEqual(200);

    expect(res.body.length).toEqual(3);
  });

  it('OK /talks (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/talks')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken);
    expect(res.status).toEqual(201);

    expect(res.body).toHaveProperty('id');
  });

  it('OK /talks/:id/invite (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/talks/2/invite')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken)
      .send({
        inviteeEmail: bob.email,
      });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({});
  });

  it('NG /talks/:id/invite (POST): talk does not exist', async () => {
    const res = await request(app.getHttpServer())
      .post('/talks/999/invite')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken)
      .send({
        inviteeEmail: bob.email,
      });
    expect(res.status).toEqual(404);
  });

  it('NG /talks/:id/invite (POST): no inviteeEmail', async () => {
    const res = await request(app.getHttpServer())
      .post('/talks/2/invite')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken)
      .send({});
    expect(res.status).toEqual(400);
  });

  it('NG /talks/:id/invite (POST): talk that inviter does not join', async () => {
    const res = await request(app.getHttpServer())
      .post('/talks/3/invite')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken)
      .send({ inviteeEmail: bob.email });
    expect(res.status).toEqual(404);
  });

  it('NG /talks/:id/invite (POST): invitee dose not exist', async () => {
    const res = await request(app.getHttpServer())
      .post('/talks/2/invite')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken)
      .send({ inviteeEmail: 'no.user@test.com' });
    // status code must be 201 because user existence must be private
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({});
  });

  it('NG /talks/:id/invite/:invitationId/accept (POST): invalid invitee', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks/2/invite/1/accept')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken);
    expect(res.status).toEqual(404);
  });

  it('OK /talks/:id/invite/:invitationId/accept (POST)', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks/2/invite/1/accept')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ talkId: 2 });
  });

  it('NG /talks/:id/invite/:invitationId/accept (POST): already accepted', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks/2/invite/1/accept')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken);
    expect(res.status).toEqual(404);
  });

  it('NG /talks/:id/invite/:invitationId/accept (POST): invitation does not exist', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks/2/invite/999/accept')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken);
    expect(res.status).toEqual(404);
  });
});
