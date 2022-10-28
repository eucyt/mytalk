import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true })); // for class-validator
  app.enableCors({
    origin: ['http://localhost:8080', 'https://mytalk.euchi.jp'],
  });
  await app.listen(3000);
}
// eslint-disable-next-line promise/valid-params
void bootstrap().then();
