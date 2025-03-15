import dotenv from 'dotenv';

dotenv.config({});



class Config {
  public MONGO_URL: string | undefined;
  

  constructor() {
    this.MONGO_URL = process.env.JWT_TOKEN || '';
  }
}

export const config: Config = new Config();
