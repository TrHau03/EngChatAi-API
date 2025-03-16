import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop()
  messages: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
