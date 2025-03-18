import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  async createUser() {
    try {
      const token = await this.authService.createToken();
      return token;
    } catch (error) {}
  }
}
