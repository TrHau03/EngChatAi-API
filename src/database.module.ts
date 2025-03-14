import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { UsersModule } from './users/user.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://hault2003:hault2003@chat.yqjir.mongodb.net/Db'),
    UsersModule,
  ],
  providers: [MongoService],
})
export class AppModule {}
