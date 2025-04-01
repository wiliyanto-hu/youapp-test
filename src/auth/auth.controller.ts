import {
  Body,
  Controller,
  NotFoundException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { Auth } from './auth';
import { LoginDTO } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private authService: Auth) {}
  @Post('register')
  register(@Body(new ValidationPipe()) registerDto: RegisterDTO) {
    const user = this.authService.register(registerDto);
    return user;
  }
  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDTO) {
    const user = await this.authService.login(loginDto);
    if (!user) throw new NotFoundException();
    return user;
  }
}
