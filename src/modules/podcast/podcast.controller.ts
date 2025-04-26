import { Controller, Get, Param, Query } from '@nestjs/common';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { GetAllPodcastsRes } from './dto/get-podcast-res.dto';
import { PodcastService } from './podcast.service';

@Controller('podcasts')
export class PodcastController {
  constructor(private podcastService: PodcastService) {}

  @Get('/')
  async getAllPodcasts(
    @Query('topic') topic: string,
  ): Promise<GetAllPodcastsRes[]> {
    try {
      return this.podcastService.getAllPodcasts(topic);
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }

  @Get('/:id')
  async getPodcast(@Param('id') id: string): Promise<GetAllPodcastsRes> {
    try {
      return this.podcastService.getPodcast(id);
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
