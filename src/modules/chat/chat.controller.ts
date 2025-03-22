import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
      console.log({ user });

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
