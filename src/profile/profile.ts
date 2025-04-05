import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Profile } from './profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getZodiacAndHoroscope } from './profile.util';
import { CreateProfileParams } from './interfaces/createProfile.interface';
import { convertPhotoToBase64 } from './utils/photoConverter.util';

@Injectable()
export class ProfileService {
  constructor(@InjectModel('Profile') private profileModel: Model<Profile>) {}

  async createProfile(
    createProfileParams: CreateProfileParams,
  ): Promise<Profile> {
    const { createProfileDto, userId, coverPhoto, photo } = createProfileParams;
    const existingProfile = await this.getProfileByUserId(userId);
    if (existingProfile) throw new ConflictException('Profile already exist');
    const birthday = new Date(createProfileDto.birthday);
    const { horoscope, zodiac } = getZodiacAndHoroscope(birthday);
    return await this.profileModel.create({
      ...createProfileDto,
      userId,
      horoscope,
      zodiac,
      birthday,
      coverPhoto,
      photo,
    });
  }
  async getProfileByUserId(userId: string): Promise<Profile | null> {
    const profile = await this.profileModel.findOne({ userId });
    if (!profile) return null;

    const profileObj = profile.toObject();
    return {
      ...profileObj,
      photo: convertPhotoToBase64(profileObj.photo ?? undefined),
      coverPhoto: convertPhotoToBase64(profileObj.coverPhoto ?? undefined),
    };
  }
  async updateProfile(
    createProfileParams: CreateProfileParams,
  ): Promise<Profile | null> {
    const { createProfileDto, userId, coverPhoto, photo } = createProfileParams;

    const existingProfile = await this.getProfileByUserId(userId);
    if (!existingProfile) throw new NotFoundException('Profile not exist');
    const birthday = new Date(createProfileDto.birthday);
    const { horoscope, zodiac } = getZodiacAndHoroscope(birthday);
    return await this.profileModel.findOneAndUpdate(
      { userId },
      {
        ...createProfileDto,
        userId,
        horoscope,
        zodiac,
        birthday,
        coverPhoto,
        photo,
      },
    );
  }
}
