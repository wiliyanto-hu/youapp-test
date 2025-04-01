import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'src/user/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Auth {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });
    return newUser;
  }
  async login(loginDto: LoginDTO): Promise<String | null> {
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

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
