import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
@Injectable()
export class AuthService {
  constructor() {}

  async createToken(): Promise<string> {
    try {
      const uid = 'engChat';
      const token = await auth().createCustomToken(uid);

      return token;
    } catch (error) {
      return '';
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      console.log(token);

      const decodedToken = await auth().verifyIdToken(token);
      console.log(decodedToken);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
