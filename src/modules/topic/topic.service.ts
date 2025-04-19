import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { Topic, TopicDocument } from 'src/schemas/topic.schema';
import { CreateTopicReq } from './dto/create-topic-req';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,
  ) {}

  async getTopics() {
    try {
      const topics = await this.topicModel.find();
      return topics;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
  async createTopic(topic: CreateTopicReq): Promise<boolean> {
    try {
      const newTopic = new this.topicModel(topic);
      await newTopic.save();
      return true;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
  async deleteTopic(id: string): Promise<boolean> {
    try {
      await this.topicModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
