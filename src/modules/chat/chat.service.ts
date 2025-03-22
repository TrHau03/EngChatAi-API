import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorCode, ErrorType } from 'src/errors';
import { Chat, ChatDocument } from 'src/schemas/chat.schema';
import { ChatResponseDTO, ChatUpdateRequestDTO } from './dto/chat';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async getChat(email: string): Promise<ChatResponseDTO> {
    try {
      const chat = await this.chatModel.findOne({ email });
      if (!chat) {
        const newChat = new this.chatModel({ email, data: [] });
        await newChat.save();
        return newChat;
      }
      return chat;
    } catch (error) {
      console.log(error);
      throw new HttpException(ErrorType.BAD_GATEWAY, ErrorCode.BAD_GATEWAY);
    }
  }

  async updateChatById(
    ownerId: string,
    { messages }: ChatUpdateRequestDTO,
  ): Promise<ChatUpdateRequestDTO> {
    try {
      const updatedMessages = messages.map((msg) => ({
        ...msg,
        _id: new Types.ObjectId(),
        created_at: msg.created_at || new Date(),
      }));

      const chat = await this.chatModel.findOneAndUpdate(
        { ownerId },
        { $push: { messages: { $each: updatedMessages } } },
        { new: true, upsert: true },
      );

      return chat;
    } catch (error) {
      console.error('Error updating chat:', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorCode.INTERNAL_SERVER,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteChatByOwnerId(ownerId: string) {
    const result = await this.chatModel.findOneAndDelete({ ownerId });
    if (!result) {
      throw new HttpException(
        { statusCode: HttpStatus.NOT_FOUND, message: ErrorCode.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: 'Chat deleted successfully' };
  }
  async deleteMessageById(ownerId: string, messageId: string) {
    try {
      const chat = await this.chatModel.findOneAndUpdate(
        { ownerId },
        { $pull: { messages: { _id: new Types.ObjectId(messageId) } } },
        { new: true },
      );

      if (!chat) {
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, message: ErrorCode.NOT_FOUND },
          HttpStatus.NOT_FOUND,
        );
      }

      return { message: 'Message deleted successfully', chat };
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorCode.INTERNAL_SERVER,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
