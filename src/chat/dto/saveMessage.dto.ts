import { IsString, IsNotEmpty } from 'class-validator';

export class SaveMessageDto {
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
