import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.MONGO_URL}`),
    ChatModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
