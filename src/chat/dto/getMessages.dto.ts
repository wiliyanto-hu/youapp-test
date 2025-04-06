import { IsNotEmpty, IsString } from 'class-validator';

export class GetMessagesDto {
  @IsNotEmpty()
  @IsString()
  recipientId: string;
}
