import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatUpdateRequestDTO } from './dto/chat';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get('getChatByOwnerId/:ownerId')
  getChatById(@Param('ownerId') ownerId: string) {
    try {
      return this.chatService.getChatById(ownerId);
    } catch (error) {}
  }

  @Post('chatUpdate/:ownerId')
  chatUpdate(
    @Param('ownerId') ownerId: string,
    @Body() body: ChatUpdateRequestDTO,
  ) {
    try {
      return this.chatService.updateChatById(ownerId, body);
    } catch (error) {}
  }
}
