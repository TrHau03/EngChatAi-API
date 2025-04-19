import { Controller, Get, Query } from '@nestjs/common';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Get()
  getWords(
    @Query('cursor') cursor: string,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('level') level: string,
    @Query('part_of_speech') partOfSpeech: string,
  ) {
    try {
      console.log({ cursor, limit, search, level });
      const payload = {
        cursor,
        limit,
        search,
        level,
        partOfSpeech,
      };

      return this.wordsService.getWords(payload);
    } catch (error) {
      console.error('Error fetching words:', error);
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
