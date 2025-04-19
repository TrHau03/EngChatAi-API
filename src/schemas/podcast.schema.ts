import { Prop, SchemaFactory } from '@nestjs/mongoose';

interface SegmentType {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: Array<number>;
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
}

export type PodcastDocument = Podcast & Document;

export class Podcast {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  topic: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  audioUrl: string;
  @Prop()
  text: string;
  @Prop({
    type: {
      id: Number,
      seek: Number,
      start: Number,
      end: Number,
      text: String,
      tokens: [Number],
      temperature: Number,
      avg_logprob: Number,
      compression_ratio: Number,
      no_speech_prob: Number,
    },
  })
  segments: SegmentType[];
  @Prop()
  language: string;
}

export const PodcastSchema = SchemaFactory.createForClass(Podcast);
