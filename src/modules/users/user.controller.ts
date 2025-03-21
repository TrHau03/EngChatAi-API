import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { SignIndDTO } from './create-user.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}
  @Public()
  @Post('create')
  async signIn(@Body() { idToken }: SignIndDTO) {}
  @Public()
  @Get('/info')
  async getUsers() {}
}
