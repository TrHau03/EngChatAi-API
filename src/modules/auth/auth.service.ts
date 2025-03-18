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
}
