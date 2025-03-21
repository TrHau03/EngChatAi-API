import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from '../../decorator/public.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dto/login';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: LoginRequestDTO) {
    try {
      console.log({ signInDto });
      const token = await this.authService.signIn(signInDto);
      console.log({ token });
      return token;
    } catch (error) {
      console.log(error);
    }
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
