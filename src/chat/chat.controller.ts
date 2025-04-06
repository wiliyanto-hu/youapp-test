import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { GetMessagesDto } from './dto/getMessages.dto';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('viewMessages')
  async getChat(
    @Req() req,
    @Query(new ValidationPipe({ transform: true })) query: GetMessagesDto,
  ) {
    return await this.chatService.getMessages(
      req.user.userId,
      query.recipientId,
    );
  }
}
