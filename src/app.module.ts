import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { MongoService } from './app.service';
import { UsersModule } from './users/user.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hault2003:hault2003@chat.yqjir.mongodb.net/Db',
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [MongoService],
})
export class AppModule {}
