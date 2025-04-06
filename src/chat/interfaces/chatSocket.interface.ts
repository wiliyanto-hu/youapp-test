import { Socket } from 'socket.io';

export type JWTPayload = {
  username: string;
  userId: string;
};

export interface CustomSocket extends Socket {
  user?: JWTPayload;
}
