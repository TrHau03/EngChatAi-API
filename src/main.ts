import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { AppModule } from './app.module';
var service = require('../engchatai-553acda6f7d4.json');

async function bootstrap() {
  initializeApp({
    projectId: 'engchatai-8d022',
    serviceAccountId: 'engchatai@engchatai.iam.gserviceaccount.com',
    credential: admin.credential.cert(service),
  });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
