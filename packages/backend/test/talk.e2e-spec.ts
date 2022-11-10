import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { TalkModule } from '../src/talk/talk.module';
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

    expect(res.body.talks.length).toEqual(3);
    expect(res.body.talks[0].users).toEqual([{ displayName: 'Alice' }]);
  });

  it('OK /talks (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/talks')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken);
    expect(res.status).toEqual(201);

    expect(res.body).toHaveProperty('id');
  });

  it('OK /talks/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks/2')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken);
    expect(res.status).toEqual(200);

    expect(res.body.messages.length).toEqual(3);
    expect(res.body.messages[0]).toEqual({
      senderId: 1,
      senderName: 'Alice',
      content: 'test message2',
    });
    expect(res.body.users).toEqual([
      { id: 1, displayName: 'Alice' },
      { id: 2, displayName: 'Bob' },
    ]);
  });

  it('NG /talks/:id (GET): The user is not a member in talk.', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks/1')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken);
    expect(res.status).toEqual(404);
  });

  it('NG /talks/:id (GET): The talk does NOT exist.', async () => {
    const res = await request(app.getHttpServer())
      .get('/talks/999')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken);
    expect(res.status).toEqual(404);
  });

  it('OK /talks/:id/message (POST)', async () => {
    const testMessage = 'test creating message';
    const res = await request(app.getHttpServer())
      .post('/talks/1/message')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken)
      .send({ message: testMessage });
    expect(res.status).toEqual(201);
  });

  it('NG /talks/:id/message (POST): The user is not a member in talk.', async () => {
    const testMessage = 'test creating message';
    const res = await request(app.getHttpServer())
      .post('/talks/1/message')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + bobAccessToken)
      .send({ message: testMessage });
    expect(res.status).toEqual(404);
  });

  it('NG /talks/:id/message (POST): The talk does NOT exist.', async () => {
    const testMessage = 'test creating message';
    const res = await request(app.getHttpServer())
      .post('/talks/999/message')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + aliceAccessToken)
      .send({ message: testMessage });
    expect(res.status).toEqual(404);
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
});
