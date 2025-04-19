import { Controller, Get, Query } from '@nestjs/common';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { WordsByTopicService } from './words-by-topic.service';

@Controller('wordsByTopic')
export class WordsByTopicController {
  constructor(private wordsByTopicService: WordsByTopicService) {}
  @Get('/')
  async getWordsByTopoc(
    @Query('cursor') cursor: string,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('topic') topic: string,
    @Query('part_of_speech') partOfSpeech: string,
  ) {
    try {
      const payload = {
        cursor,
        limit,
        search,
        topic,
        partOfSpeech,
      };
      if (!topic) {
        return [];
      }
      return this.wordsByTopicService.getWordsByTopic(payload);
    } catch (error) {
      console.error('Error fetching words:', error);
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
