import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'src/user/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class Auth {
  constructor(private userService: UserService) {}

  async register(registerDto: RegisterDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });
    return newUser;
  }
  async login(loginDto: LoginDTO): Promise<User | null> {
    const user = await this.userService.findUser(loginDto.username);

    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
