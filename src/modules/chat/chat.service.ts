import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from 'src/schemas/chat.schema';
import { ChatUpdateRequestDTO } from './dto/chat';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}
  async getChatById(ownerId: string) {
    try {
      const chat = await this.chatModel.findOne({ ownerId });
      return chat;
    } catch (error) {}
  }
  async updateChatById(ownerId: string, { messages }: ChatUpdateRequestDTO) {
    try {
      const chat = await this.chatModel.findOne({ ownerId });
      if (chat) {
        chat.data.push({ messages });
        await chat.save();
        return true;
      } else {
        const newChat = await this.chatModel.create({
          ownerId,
          data: [{ messages }],
        });
        await newChat.save();
        return true;
      }
    } catch (error) {}
  }
}
