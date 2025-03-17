import * as admin from 'firebase-admin';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/user.service';

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

  async verifyToken(idToken: string) {
    console.log('🔍 Token nhận được:', idToken);
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  }

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user._id, username: user.username, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
  async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
  
    const access_token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
  
  
    return { access_token, refresh_token };
  }
  
}
