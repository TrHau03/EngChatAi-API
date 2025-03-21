import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './modules/users/user.service';
import { UserController } from './modules/users/user.controller';
import { config } from './config';
import { ChatController } from './modules/chat/chat.controller';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.MONGO_URL}`), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ChatModule,
  ],
  controllers: [UserController, ChatController],
  providers: [UsersService],
})
export class AppModule {}
