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
  async getMessages(senderId: string, recipientId: string) {
    return this.chatModel
      .find({
        $or: [
          { senderId, recipientId },
          { senderId: recipientId, recipientId: senderId },
        ],
      })
      .sort({ timestamp: 1 });
  }
}
