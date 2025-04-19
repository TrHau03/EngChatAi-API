import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { Words, WordsDocument } from 'src/schemas/works.schema';
import { GetListWordsReqDTO } from './dto/get-words-req.dto';
import { GetListWordsResDTO } from './dto/get-words-res.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Words.name) private wordsModel: Model<WordsDocument>,
  ) {}

  async getWords(payload: GetListWordsReqDTO): Promise<GetListWordsResDTO> {
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
      if (partOfSpeech) {
        query = {
          ...query,
          part_of_speech: { $regex: partOfSpeech, $options: 'i' },
        };
      }
      const cursorQuery = cursor !== 'null' ? { _id: { $gt: cursor } } : {};
      const limitQuery = limit ? parseInt(limit.toString()) : 20; // default limit;
      const words = await this.wordsModel
        .find(query)
        .find(cursorQuery)
        .limit(limitQuery)
        .sort({ _id: 1 })
        .exec();
      const nextCursor =
        words.length > 0 ? (words[words.length - 1]._id as string) : null;
      const isEndList = words.length < limitQuery;
      const result: GetListWordsResDTO = {
        words: words,
        cursor: nextCursor,
        isEndList,
      };
      return result;
    } catch (error) {
      console.error('Error fetching words:', error);
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
