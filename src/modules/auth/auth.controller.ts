import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
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

  @Post('verify')
  @UseGuards(AuthGuard)
  async verifyUser() {
    try {
      return true;
    } catch (error) {}
  }
}
