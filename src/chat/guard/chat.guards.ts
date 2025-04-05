import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const secretKey = this.configService.get<string>('JWT_SECRET');

    if (!secretKey) {
      throw new Error('Missing JWT_SECRET in environment variables!');
    }

    const client = context.switchToWs().getClient();
    const token = client.handshake?.headers?.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) throw new WsException('Missing token');

    try {
      const payload = jwt.verify(token, secretKey); // Adjust to your secret
      client.user = payload; // Attach the user to the socket client
      return true;
    } catch (err) {
      throw new WsException('Invalid token');
    }
  }
}
