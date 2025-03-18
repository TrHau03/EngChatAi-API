import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { ChatController } from './modules/chat/chat.controller';
import { ChatModule } from './modules/chat/chat.module';
import { UserController } from './modules/users/user.controller';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.MONGO_URL}`),
    ChatModule,
    UsersModule,
    AuthModule
  ],
  controllers: [UserController, ChatController,AuthController],
  providers: [],
})
export class AppModule {}
