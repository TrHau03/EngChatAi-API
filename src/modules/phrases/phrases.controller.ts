import { Controller, Get, Query } from '@nestjs/common';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { PhrasesService } from './phrases.service';

@Controller('phrases')
export class PhrasesController {
  constructor(private phrasesService: PhrasesService) {}
  @Get('/')
  getPhrases(
    @Query('cursor') cursor: string,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('level') level: string,
  ) {
    try {
      console.log({ cursor, limit, search, level });
      const payload = {
        cursor,
        limit,
        search,
        level,
      };

      return this.phrasesService.getPhrases(payload);
    } catch (error) {
      console.error('Error fetching words:', error);
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
