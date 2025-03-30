import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';

@Controller()
export class AuthController {
  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    return registerDto;
  }
}
