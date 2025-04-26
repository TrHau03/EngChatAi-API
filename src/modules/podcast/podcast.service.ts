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

  async getAllPodcasts(topic: string): Promise<GetAllPodcastsRes[]> {
    try {
      let query = {};

      if (topic) {
        query = { topic: { $regex: topic, $options: 'i' } };
      }
      const podcast = await this.podcastModel
        .find(query, { title: 1, topic: 1, image: 1 })
        .exec();
      return podcast;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
  async getPodcast(id: string): Promise<GetAllPodcastsRes> {
    try {
      const podcast = await this.podcastModel.findById(id);
      if (!podcast) {
        throw Exception.HTTPException(ErrorType.NOT_FOUND, ErrorCode.NOT_FOUND);
      }
      return podcast;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
