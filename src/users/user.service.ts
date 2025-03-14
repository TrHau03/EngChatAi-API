import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(): Promise<User> {
    return {
      name: ' Bư Ngu',
      email: 'bunghuyen@fe.edu.vn',
    };
  }
}
