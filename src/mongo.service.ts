import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class MongoService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    console.log('MongoDB Connection State:', this.connection.readyState);
  }
}
