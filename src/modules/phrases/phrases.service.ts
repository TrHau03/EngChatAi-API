import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { Phrases, PhrasesDocument } from 'src/schemas/phrases.schema';
import { GetPhrasesReqDto } from './dto/get-phrases-req.dto';
import { GetPhrasesResDTO } from './dto/get-phrases-res.dto';

@Injectable()
export class PhrasesService {
  constructor(
    @InjectModel(Phrases.name) private phrasesModel: Model<PhrasesDocument>,
  ) {}

  async getPhrases(payload: GetPhrasesReqDto): Promise<GetPhrasesResDTO> {
    try {
      const { cursor, limit, search, level, partOfSpeech } = payload;

      let query = {};
      if (search) {
        query = {
          ...query,
          word: { $regex: search, $options: 'i' },
        };
      }
      if (level) {
        query = {
          ...query,
          level: { $regex: level, $options: 'i' },
        };
      }
      const cursorQuery = cursor !== 'null' ? { _id: { $gt: cursor } } : {};
      const limitQuery = limit ? parseInt(limit.toString()) : 20; // default limit;
      const phrases = await this.phrasesModel
        .find(query)
        .find(cursorQuery)
        .limit(limitQuery)
        .sort({ _id: 1 })
        .exec();
      const nextCursor =
        phrases.length > 0 ? (phrases[phrases.length - 1]._id as string) : null;
      const isEndList = phrases.length < limitQuery;
      const result: GetPhrasesResDTO = {
        phrases: phrases,
        cursor: nextCursor,
        isEndList,
      };
      return result;
    } catch (error) {
      console.error('Error fetching phrases:', error);
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
