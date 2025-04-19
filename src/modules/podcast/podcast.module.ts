import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Podcast, PodcastSchema } from 'src/schemas/podcast.schema';
import { PodcastController } from './podcast.controller';
import { PodcastService } from './podcast.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Podcast.name, schema: PodcastSchema }]),
  ],
  providers: [PodcastService],
  controllers: [PodcastController],
})
export class PodcastModule {}
