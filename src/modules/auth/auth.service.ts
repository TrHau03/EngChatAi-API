import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config';
import { UsersService } from '../users/user.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn({ username, password }: { username: string; password: string }) {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const access_token = this.generateAccessToken(user._id, user.username);
    // const refresh_token = this.generateRefreshToken(user._id, user.username);

    // await this.usersService.updateRefreshToken(user._id, refresh_token);

    // return { access_token, refresh_token };
  }

  generateAccessToken(userId: string, username: string): string {
    return this.jwtService.sign(
      { sub: userId, username },
      { secret: config.JWT_SECRET, expiresIn: '60s' },
    );
  }

  generateRefreshToken(userId: string, username: string): string {
    return this.jwtService.sign(
      { sub: userId, username },
      { secret: config.JWT_REFRESH_SECRET, expiresIn: '120s' },
    );
  }
  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: config.JWT_REFRESH_SECRET,
      });
      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, username: payload.username },
        { secret: config.JWT_SECRET, expiresIn: '60s' },
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
