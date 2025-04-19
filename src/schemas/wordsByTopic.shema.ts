import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type WordsByTopicDocument = WordsByTopic & Document;
export class WordsByTopic {
  @Prop({ required: true })
  word: string;
  @Prop()
  part_of_speech: string;
  @Prop()
  topic: string;
  @Prop({ type: { uk: String, us: String } })
  pronunciation: {
    uk: string;
    us: string;
  };
}

export const WordsByTopicSchema = SchemaFactory.createForClass(WordsByTopic);
