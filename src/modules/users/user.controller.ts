import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}
  @Public()
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  @Public()
  @Get('/info')
  async getUsers() {
    return this.usersService.getUsers();
  }
}
