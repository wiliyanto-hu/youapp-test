import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './chat.schema';
import { ChatGateway } from './chat.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    ConfigModule,
  ],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
