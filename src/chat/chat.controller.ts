import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get('getChatByOwnerId')
  getChatById(@Param('ownerId') ownerId: string) {
    try {
      return this.chatService.getChatById(ownerId);
    } catch (error) {}
  }
}
