import { NestFactory } from '@nestjs/core';
import { AppModule } from './database.module';
import { UsersService } from './users/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UsersService);

  await userService.createUser('HauNgu', 'Nhan123');

  
}
bootstrap();
