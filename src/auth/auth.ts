import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'src/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class Auth {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async register(registerDto: RegisterDTO): Promise<User> {
    const newUser = await this.userModel.create(registerDto);
    return newUser;
  }
}
