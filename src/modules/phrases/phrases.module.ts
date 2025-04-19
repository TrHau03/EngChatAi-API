import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Phrases, PhrasesSchema } from 'src/schemas/phrases.schema';
import { PhrasesController } from './phrases.controller';
import { PhrasesService } from './phrases.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Phrases.name, schema: PhrasesSchema }]),
  ],
  controllers: [PhrasesController],
  providers: [PhrasesService],
})
export class PhrasesModule {}
