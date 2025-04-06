import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { GetMessagesDto } from './dto/getMessages.dto';
import { SendMessageDto } from './dto/sendMessage.dto';
import { ChatGateway } from './chat.gateway';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('Authorization')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private readonly chatGateway: ChatGateway,
  ) {}

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

  @Post('sendMessage')
  async sendMessage(
    @Req() req,
    @Body(new ValidationPipe()) sendMessageDto: SendMessageDto,
  ) {
    const savedMessage = await this.chatService.saveMessage({
      senderId: req.user.userId,
      ...sendMessageDto,
    });

    this.chatGateway.server
      .to(sendMessageDto.recipientId)
      .emit('receivePrivateMessage', sendMessageDto);

    return savedMessage;
  }
}
