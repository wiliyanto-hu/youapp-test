import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { Message } from './message';

@Module({
  controllers: [MessageController],
  providers: [Message]
})
export class MessageModule {}
