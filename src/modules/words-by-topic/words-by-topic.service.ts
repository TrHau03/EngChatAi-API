import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { WordsByTopic } from 'src/schemas/wordsByTopic.shema';
import { GetWordsByTopicReqDTO } from './dto/get-words-req.dto';
import { GetWordsByTopicResDTO } from './dto/get-words-res.dto';

@Injectable()
export class WordsByTopicService {
  constructor(
    @InjectModel(WordsByTopic.name)
    private wordsByTopicModel: Model<WordsByTopic>,
  ) {}

  async getWordsByTopic(
    payload: GetWordsByTopicReqDTO,
  ): Promise<GetWordsByTopicResDTO> {
    try {
      const { cursor, limit, search, topic, part_of_speech } = payload;

      let query: any = {
        topic: { $regex: topic, $options: 'i' },
      };
      if (search) {
        query = {
          ...query,
          word: { $regex: search, $options: 'i' },
        };
      }
      if (part_of_speech) {
        query = {
          ...query,
          part_of_speech: { $regex: part_of_speech, $options: 'i' },
        };
      }
      const cursorQuery = cursor !== 'null' ? { _id: { $gt: cursor } } : {};
      const limitQuery = limit ? parseInt(limit.toString()) : 20; // default limit;
      const words = await this.wordsByTopicModel
        .find(query)
        .find(cursorQuery)
        .limit(limitQuery)
        .sort({ _id: 1 })
        .exec();
      const nextCursor =
        words.length > 0 ? words[words.length - 1]._id.toString() : null;
      const isEndList = words.length < limitQuery;
      const result: GetWordsByTopicResDTO = {
        wordsByTopic: words,
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
