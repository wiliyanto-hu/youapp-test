import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './chat.schema';
import { Model } from 'mongoose';
import { SaveMessageParams } from './interfaces/saveMessage.interface';
@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {}

  async saveMessage(SaveMessageParams: SaveMessageParams) {
    await this.chatModel.create(SaveMessageParams);
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
