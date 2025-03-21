import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from 'src/entities/message';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  ownerId: string;

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, auto: true },
        role: String,
        content: String,
        content_translated: String,
        created_at: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
