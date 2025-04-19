import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
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
      console.log('getChat error', error);
      throw new HttpException(ErrorType.BAD_GATEWAY, ErrorCode.BAD_GATEWAY);
    }
  }

  async updateChat(
    email: string,
    { _id, title, messages }: ChatUpdateRequestDTO,
  ): Promise<Boolean> {
    try {
      const user = await this.chatModel.findOne({ email });
      if (!user) {
        throw Exception.HTTPException(ErrorType.NOT_FOUND, ErrorCode.NOT_FOUND);
      }
      user.data.push({ _id, title, messages });
      await user.save();
      return true;
    } catch (error) {
      console.error('Error updating chat:', error);
      throw Exception.HTTPException(
        ErrorType.BAD_GATEWAY,
        ErrorCode.BAD_GATEWAY,
      );
    }
  }

  async deleteChat(email: string, _id: string): Promise<boolean> {
    try {
      const chat = await this.chatModel.findOne({ email });
      if (!chat) {
        throw Exception.HTTPException(ErrorType.NOT_FOUND, ErrorCode.NOT_FOUND);
      }
      console.log({ _id });
      chat.data = chat.data.filter((item) => item._id !== _id);
      await chat.save();
      return true;
    } catch (error) {
      console.log('deleteChat error', error);
      throw Exception.HTTPException(
        ErrorType.BAD_GATEWAY,
        ErrorCode.BAD_GATEWAY,
      );
    }
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
