import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as listEndpoints from 'express-list-endpoints';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true })); // for class-validator
  await app.listen(3000);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const server = app.getHttpServer();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  const router = server._events.request._router;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  console.log(listEndpoints(router));
}
// eslint-disable-next-line promise/valid-params
void bootstrap().then();
