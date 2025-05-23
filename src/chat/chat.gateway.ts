import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  WsException,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CustomSocket, JWTPayload } from './interfaces/chatSocket.interface';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ChatService } from './chat.service';

@WebSocketGateway(5000)
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private configService: ConfigService,
    private chatService: ChatService,
  ) {}

  async handleConnection(client: CustomSocket) {
    const token = client.handshake?.headers?.authorization?.split(' ')[1];
    const secret = this.configService.get<string>('JWT_SECRET');

    if (!token || !secret) {
      client.disconnect();
      return;
    }

    try {
      const payload = jwt.verify(token, secret) as JWTPayload;
      client.user = payload;

      await client.join(client.user.userId);
    } catch (err) {
      console.log('Invalid token');
      client.disconnect();
    }
  }

  @SubscribeMessage('sendPrivateMessage')
  async handlePrivateMessage(
    @MessageBody() data: { recipientId: string; message: string },
    @ConnectedSocket() client: CustomSocket,
  ) {
    if (!client.user) throw new WsException('Unauthorized');
    const senderId = client.user.userId;

    const payload = {
      senderId,
      message: data.message,
    };
    await this.chatService.saveMessage({
      ...payload,
      recipientId: data.recipientId,
    });
    this.server.to(data.recipientId).emit('receivePrivateMessage', payload);
  }
}
