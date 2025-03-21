import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  Delete, 
  HttpStatus 
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatUpdateRequestDTO } from './dto/chat';
import { Public } from 'src/decorator/public.decorator';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Public()
  @Post('create/:ownerId')
  async createChat(@Param('ownerId') ownerId: string) {
  return this.chatService.createChat(ownerId);
  }
  @Public()
  @Get('getChat/:ownerId')
  async getChatById(@Param('ownerId') ownerId: string) {
    const chat = await this.chatService.getChatById(ownerId);
    return { statusCode: HttpStatus.OK, data: chat };
  }
  @Public()
  @Post('update/:ownerId')
  async chatUpdate(
    @Param('ownerId') ownerId: string,
    @Body() body: ChatUpdateRequestDTO,
  ) {
    const updatedChat = await this.chatService.updateChatById(ownerId, body);
    return { statusCode: HttpStatus.OK, data: updatedChat };
  }
  @Public()
  @Delete('delete/:ownerId')
  async deleteChat(@Param('ownerId') ownerId: string) {
    await this.chatService.deleteChatByOwnerId(ownerId);
    return { statusCode: HttpStatus.OK, message: 'Chat deleted successfully' };
  }
  @Public()
  @Delete('deletemsg/:ownerId/message/:messageId')
  async deleteMessage(@Param('ownerId') ownerId: string,@Param('messageId') messageId: string,) {
    return this.chatService.deleteMessageById(ownerId, messageId);
}
}
