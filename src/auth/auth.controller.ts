import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UnauthorizedException
} from '@nestjs/common';
// import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../modules/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { username: string; password: string }) {
    const user = await this.usersService.findOneByUsername(signInDto.username);
    
    if (!user || !(await this.authService.signIn(signInDto.password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { access_token, refresh_token } = await this.authService.generateTokens(user._id, user.username);

    return { access_token, refresh_token };
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
