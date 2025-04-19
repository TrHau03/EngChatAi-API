import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WordsDocument = Words & Document;

@Schema()
export class Words {
  @Prop({ required: true })
  word: string;
  @Prop({ required: true })
  part_of_speech: string;
  @Prop({ required: true })
  level: string;
  @Prop({ type: { uk: String, us: String } })
  pronunciation: {
    uk: string;
    us: string;
  };
}

export const WordsSchema = SchemaFactory.createForClass(Words);
