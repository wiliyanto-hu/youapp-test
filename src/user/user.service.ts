import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findUser({ username, email }): Promise<User | null> {
    return await this.userModel.findOne({
      $or: [{ email }, { username }],
    });
  }

  async createUser(registerDto: RegisterDTO): Promise<User> {
    return await this.userModel.create(registerDto);
  }
}
