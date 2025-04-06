import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
