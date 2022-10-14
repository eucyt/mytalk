import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { TalkInvitationModule } from '../src/talk-invitation/talk-invitation.module';
import { resetDatabase } from './detabese-reset';

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
    resetDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TalkInvitationModule],
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

    await request(app.getHttpServer())
      .post('/talks/2/invite')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken)
      .send({
        inviteeEmail: bob.email,
      });
  });

  it('NG /talk-invitation/:invitationId/accept (POST): invalid invitee', async () => {
    const res = await request(app.getHttpServer())
      .get('/talk-invitation/1/accept')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken);
    expect(res.status).toEqual(404);
  });

  it('NG /talk-invitation/:invitationId/accept (POST): already accepted', async () => {
    const res = await request(app.getHttpServer())
      .get('/talk-invitation/1/accept')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken);
    expect(res.status).toEqual(404);
  });

  it('NG /talk-invitation/:invitationId/accept (POST): invitation does not exist', async () => {
    const res = await request(app.getHttpServer())
      .get('/talk-invitation/999/accept')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken);
    expect(res.status).toEqual(404);
  });

  it('OK /talk-invitation/:invitationId/accept (POST)', async () => {
    const res = await request(app.getHttpServer())
      .get('/talk-invitation/1/accept')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ talkId: 2 });
  });
});
