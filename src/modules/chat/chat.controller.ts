import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { ErrorCode, ErrorType, Exception } from 'src/errors';
import { AppGuard } from 'src/guards/app.guard';
import { ChatService } from './chat.service';
import { ChatResponseDTO, ChatUpdateRequestDTO } from './dto/chat';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AppGuard)
  @Get('getChat')
  async getChatById(@Req() request: Request): Promise<ChatResponseDTO> {
    try {
      const user = request['user'];
      const chat = await this.chatService.getChat(user?.sub);
      return chat;
    } catch (error) {
      console.log('getChatById error', error);
      throw Exception.HTTPException(
        ErrorType.BAD_GATEWAY,
        ErrorCode.BAD_GATEWAY,
      );
    }
  }
  @UseGuards(AppGuard)
  @Post('updateChat')
  async chatUpdate(
    @Req() request: Request,
    @Body() body: ChatUpdateRequestDTO,
  ) {
    const user = request['user'];
    const updatedChat = await this.chatService.updateChat(user?.sub, body);
    return updatedChat;
  }

  @UseGuards(AppGuard)
  @Delete('deleteChat/:id')
  async deleteChat(@Req() request: Request, @Param('id') id: string) {
    try {
      const user = request['user'];
      const deletedChat = await this.chatService.deleteChat(user?.sub, id);
      return deletedChat;
    } catch (error) {
      console.log('deleteChat error', error);
      throw Exception.HTTPException(
        ErrorType.BAD_GATEWAY,
        ErrorCode.BAD_GATEWAY,
      );
    }
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
