import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from 'src/schemas/topic.schema';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
