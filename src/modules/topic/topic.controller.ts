import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { CreateTopicReq } from './dto/create-topic-req';
import { GetTopicRes } from './dto/get-topic-req';
import { TopicService } from './topic.service';
@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}
  @Get('/')
  async getTopics(): Promise<GetTopicRes[]> {
    try {
      const topics = await this.topicService.getTopics();
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
      const createdTopic = await this.topicService.createTopic(topic);
      if (!createdTopic) {
        throw Exception.HTTPException(ErrorType.CONFLICT, ErrorCode.CONFLICT);
      }
      return createdTopic;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }

  @Delete('/:id')
  async deleteTopic(@Param('id') id: string): Promise<boolean> {
    try {
      const deletedTopic = await this.topicService.deleteTopic(id);
      if (!deletedTopic) {
        throw Exception.HTTPException(ErrorType.NOT_FOUND, ErrorCode.NOT_FOUND);
      }
      return deletedTopic;
    } catch (error) {
      throw Exception.HTTPException(
        ErrorType.INTERNAL_SERVER,
        ErrorCode.INTERNAL_SERVER,
      );
    }
  }
}
