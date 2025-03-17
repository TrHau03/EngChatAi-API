import * as dotenv from 'dotenv';


dotenv.config({});



class Config {
  public MONGO_URL: string | undefined;
  public FIREBASE_CREDENTIALS: string | undefined;
  public JWT_SECRET: string | undefined;
  

  constructor() {
    this.MONGO_URL = process.env.MONGO_URL || '';
    this.FIREBASE_CREDENTIALS = process.env.FIREBASE_CREDENTIALS || '';
    this.JWT_SECRET = process.env.JWT_SECRET || '';
  }
}

export const config: Config = new Config();
