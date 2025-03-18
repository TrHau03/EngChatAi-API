import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message } from 'src/entities/message';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  ownerId: string;

  @Prop()
  data: {
    messages: Message[];
  }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
