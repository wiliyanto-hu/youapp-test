import { Socket } from 'socket.io';

export interface CustomSocket extends Socket {
  user?: {
    username: string;
    userId: string;
  };
}
