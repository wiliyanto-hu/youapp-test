import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetMessagesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  recipientId: string;
}
