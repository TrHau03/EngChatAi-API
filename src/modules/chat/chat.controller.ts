import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get('getChatByOwnerId/:ownerId')
  getChatById(@Param('ownerId') ownerId: string) {
    try {
      return this.chatService.getChatById(ownerId);
    } catch (error) {}
  }

  @Patch('updateChat/:ownerId')
  updateChat(@Param('ownerId') ownerId: string) {
    try {
      // return this.chatService.updateChatById(ownerId, {});
      return;
    } catch (error) {}
  }
}
