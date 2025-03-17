import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('google-login')
  async googleLogin(@Body('token') token: string) {
    const decodedToken = await this.authService.verifyToken(token);

    const payload = {
        uid: decodedToken.uid,
        email: decodedToken.email || 'no-email@example.com',
        name: decodedToken.displayName || decodedToken.email || 'Unknown User', // Sửa `name` -> `displayName`
        picture: decodedToken.picture || null, 
    };

    const jwt = this.authService.generateJwt(payload);
    return { jwt, user: payload };
  }
}
