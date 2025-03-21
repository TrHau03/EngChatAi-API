import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import admin from 'firebase-admin';
import { config } from 'src/config';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { UsersService } from '../users/user.service';
import { LoginRequestDTO, LoginResponseDTO } from './dto/login';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signIn({ idToken }: LoginRequestDTO): Promise<LoginResponseDTO> {
    try {
      const email = await this.verifyToken(idToken);
      console.log({ email });

      if (!email) {
        return {
          access_token: '',
          refresh_token: '',
        };
      }
      const user = await this.userService.findUserByEmail(email!);
      if (!user) {
        await this.userService.createUser(email!);
      }
      const access_token = await this.generateAccessToken(email!);
      const refresh_token = await this.generateRefreshToken(email!);

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw Exception.HTTPException(
        ErrorType.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }
  }

  async verifyToken(token: string) {
    try {
      const decode = await admin.auth().verifyIdToken(token);
      return decode.email;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }
  }

  generateAccessToken(email: string): Promise<string> {
    return this.jwtService.signAsync(
      { sub: email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '60s',
        privateKey: process.env.JWT_SECRET,
      },
    );
  }

  generateRefreshToken(email: string): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '30d',
        privateKey: process.env.JWT_SECRET,
      },
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
      throw Exception.HTTPException(
        ErrorType.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }
  }
}
