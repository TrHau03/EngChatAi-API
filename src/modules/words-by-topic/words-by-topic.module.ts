import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WordsByTopic,
  WordsByTopicSchema,
} from 'src/schemas/wordsByTopic.shema';
import { WordsByTopicController } from './words-by-topic.controller';
import { WordsByTopicService } from './words-by-topic.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WordsByTopic.name, schema: WordsByTopicSchema },
    ]),
  ],
  controllers: [WordsByTopicController],
  providers: [WordsByTopicService],
})
export class WordsByTopicModule {}
