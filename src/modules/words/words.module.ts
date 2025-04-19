import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Words, WordsSchema } from 'src/schemas/works.schema';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Words.name, schema: WordsSchema }]),
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
