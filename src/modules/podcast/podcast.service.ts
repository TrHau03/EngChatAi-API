import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { Podcast, PodcastDocument } from 'src/schemas/podcast.schema';
import { GetAllPodcastsRes } from './dto/get-podcast-res.dto';

@Injectable()
export class PodcastService {
  constructor(
    @InjectModel(Podcast.name) private podcastModel: Model<PodcastDocument>,
  ) {}

  async getAllPodcasts(): Promise<GetAllPodcastsRes[]> {
    try {
      const podcast = await this.podcastModel.find().exec();
      return podcast;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
