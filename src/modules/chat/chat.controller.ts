import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { AppGuard } from 'src/guards/app.guard';
import { ChatService } from './chat.service';
import { ChatUpdateRequestDTO } from './dto/chat';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AppGuard)
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
  async deleteMessage(
    @Param('ownerId') ownerId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.chatService.deleteMessageById(ownerId, messageId);
  }
}
