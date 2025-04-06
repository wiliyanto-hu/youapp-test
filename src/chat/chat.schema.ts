import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ required: true }) senderId: string;
  @Prop({ required: true }) recipientId: string;
  @Prop({ required: true }) message: string;
  @Prop({ default: Date.now }) timestamp: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
