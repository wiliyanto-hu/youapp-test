import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsJwtGuard } from './guard/chat.guards';
import { CustomSocket } from './interfaces/chatSocket.interface';
@UseGuards(WsJwtGuard)
@WebSocketGateway(5000)
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { message: string; recipient: string },
    @ConnectedSocket() client: CustomSocket,
  ) {
    const user = client.user;

    this.server.emit('receiveMessage', {
      sender: user?.userId,
      message: data.message,
    });
  }
}
