import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { PhrasesModule } from './modules/phrases/phrases.module';
import { PodcastModule } from './modules/podcast/podcast.module';
import { QuestionController } from './modules/question/question.controller';
import { QuestionModule } from './modules/question/question.module';
import { QuestionService } from './modules/question/question.service';
import { TopicModule } from './modules/topic/topic.module';
import { WordsByTopicModule } from './modules/words-by-topic/words-by-topic.module';
import { WordsModule } from './modules/words/words.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.MONGO_URL}`),
    ChatModule,
    AuthModule,
    WordsModule,
    TopicModule,
    PhrasesModule,
    PodcastModule,
    WordsByTopicModule,
    QuestionModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class AppModule {}
