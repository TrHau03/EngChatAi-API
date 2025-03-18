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
// @Post('firebase-login')
//   async firebaselogin(@Body('token') token: string) {
//     const decodedToken = await this.authService.verifyToken(token);

//     const payload = {
//         uid: decodedToken.uid,
//         email: decodedToken.email || 'no-email@example.com',
//         name: decodedToken.displayName || decodedToken.email || 'Unknown User', 
//         picture: decodedToken.picture || null, 
//     };

//     const jwt = this.authService.generateJwt(payload);
//     return { jwt, user: payload };
//   }

@UseGuards(AuthGuard)
@Get('profile')
getProfile(@Req() request: Request) {
    return { message: 'User info', user: request['user'] };
  }
}


