import { Controller, Get } from '@nestjs/common';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { GetAllPodcastsRes } from './dto/get-podcast-res.dto';
import { PodcastService } from './podcast.service';

@Controller('podcasts')
export class PodcastController {
  constructor(private podcastService: PodcastService) {}

  @Get('/')
  async getAllPodcasts(): Promise<GetAllPodcastsRes[]> {
    try {
      return this.podcastService.getAllPodcasts();
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
