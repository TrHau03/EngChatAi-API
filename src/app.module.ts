import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';

import { UserController } from './modules/users/user.controller';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.MONGO_URL}`),
    UsersModule,
    AuthModule
  ],
  controllers: [UserController,AuthController],
  providers: [],
})
export class AppModule {}
