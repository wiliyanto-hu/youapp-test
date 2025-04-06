import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './chat.schema';
import { SaveMessageDto } from './dto/saveMessage.dto';
import { Model } from 'mongoose';
@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {}

  async saveMessage(saveMessageDto: SaveMessageDto) {
    await this.chatModel.create(saveMessageDto);
  }
}
