import * as dotenv from 'dotenv';


dotenv.config({});



class Config {
  public MONGO_URL: string | undefined;
  

  constructor() {
    this.MONGO_URL = process.env.MONGO_URL || '';
  }
}

export const config: Config = new Config();
