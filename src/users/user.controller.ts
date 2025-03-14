import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/info')
  async getUsers() {
    return this.usersService.createUser();
  }
}
