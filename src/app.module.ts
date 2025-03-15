import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users/user.service';
import { UserController } from './users/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(`${process.env.MONGO_URL}`), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class AppModule {}
