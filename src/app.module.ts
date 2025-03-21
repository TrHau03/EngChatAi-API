import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.MONGO_URL}`),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
