import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from '../../decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

@Public()
@HttpCode(HttpStatus.OK)
@Post('login')
  async signIn(@Body() signInDto: { username: string; password: string }) {
    return this.authService.signIn(signInDto);
}
@Public()
@Post('refresh')
async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
}

@UseGuards(AuthGuard)
@Get('profile')
getProfile(@Req() request: Request) {
    return { message: 'User info', user: request['user'] };
  }
}


