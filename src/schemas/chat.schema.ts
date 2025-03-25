import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from 'src/entities/message';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  email: string;

  @Prop()
  data: {
    _id: string;
    title: string;
    messages: Message[];
  }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
