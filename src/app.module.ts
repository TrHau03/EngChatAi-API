import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';  // 
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/user.service';
import { UserController } from './users/user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { config } from './config';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // ✅ Load biến môi trường từ .env
    MongooseModule.forRoot(`${config.MONGO_URL}`), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ChatModule,
    AuthModule
  ],
  controllers: [UserController, ChatController,AuthController],
  providers: [UsersService,AuthService],
})
export class AppModule {}
