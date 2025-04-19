import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhrasesDocument = Phrases & Document;

@Schema()
export class Phrases {
  @Prop({ required: true })
  word: string;
  @Prop({ required: true })
  level: string;
  @Prop({ type: { us: String, uk: String } })
  pronunciation: {
    us: string;
    uk: string;
  };
}

export const PhrasesSchema = SchemaFactory.createForClass(Phrases);
