import * as admin from 'firebase-admin';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    private configService: ConfigService) {
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
  
  

  generateJwt(payload: { uid: string; email: string; name: string }) {
    return this.jwtService.sign(payload);
  }
}
