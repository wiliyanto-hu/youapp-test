import { Injectable } from '@nestjs/common';
import { Profile } from './profile.schema';
import { CreateProfileDTO } from './dto/createProfile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProfileService {
  constructor(@InjectModel('Profile') private profileModel: Model<Profile>) {}

  async createProfile(
    createProfileDto: CreateProfileDTO,
    userId: string,
  ): Promise<Profile> {
    return await this.profileModel.create({ ...createProfileDto, userId });
  }
}
