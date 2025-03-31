import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { Auth } from './auth';

@Controller()
export class AuthController {
  constructor(private authService: Auth) {}
  @Post('register')
  register(@Body(new ValidationPipe()) registerDto: RegisterDTO) {
    const user = this.authService.register(registerDto);
    return user;
  }
}
