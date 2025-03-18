import * as admin from 'firebase-admin';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { config } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const firebaseCredentialsPath = this.configService.get<string>('FIREBASE_CREDENTIALS');

    try {
      if (!firebaseCredentialsPath) {
        throw new Error('FIREBASE_CREDENTIALS is not defined in environment variables');
      }

      const fileContent = fs.readFileSync(firebaseCredentialsPath, 'utf8');
      const serviceAccount = JSON.parse(fileContent);

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        console.log('Firebase Admin Initialized Successfully');
      }
    } catch (error) {
      console.error('Error initializing Firebase Admin:', error.message);
    }
  }

  // async verifyToken(idToken: string) {
  //   console.log('🔍 Token nhận được:', idToken);
  //   const decodedToken = await admin.auth().verifyIdToken(idToken);
  //   return decodedToken;
  // }

  async signIn({ username, password }: { username: string; password: string }) {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    
    const access_token = this.generateAccessToken(user._id, user.username);
    const refresh_token = this.generateRefreshToken(user._id, user.username);

    
    await this.usersService.updateRefreshToken(user._id, refresh_token);

    return { access_token, refresh_token };
  }

  generateAccessToken(userId: string, username: string): string {
    return this.jwtService.sign(
      { sub: userId, username },
      { secret: config.JWT_SECRET, expiresIn: '60s' }
    );
  }

  generateRefreshToken(userId: string,username: string): string {
    return this.jwtService.sign(
      { sub: userId, username  },
      { secret: config.JWT_REFRESH_SECRET, expiresIn: '120s' }
    );
  }
  async refreshToken(refreshToken: string) {
    try {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: config.JWT_REFRESH_SECRET,
        });
        const newAccessToken = this.jwtService.sign(
            { sub: payload.sub, username: payload.username }, 
            { secret: config.JWT_SECRET, expiresIn: '60s' }
        );

        return { access_token: newAccessToken };
    } catch (error) {
        throw new UnauthorizedException('Invalid or expired refresh token');
    }
}

  // generateJwt(payload: { uid: string; email: string; name: string }) {
  //   return this.jwtService.sign(payload);
  // }
}
