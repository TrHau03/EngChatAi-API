import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users/user.service';
import { UserController } from './users/user.controller';
import { config } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.MONGO_URL}`), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class AppModule {}
