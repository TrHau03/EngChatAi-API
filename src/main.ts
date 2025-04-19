import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { AppModule } from './app.module';
var service = require('../engchatai-service.json');

async function bootstrap() {
  initializeApp({
    projectId: process.env.PROJECT_ID,
    serviceAccountId: process.env.SERVICE_ACCOUNT,
    credential: admin.credential.cert(service),
  });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
