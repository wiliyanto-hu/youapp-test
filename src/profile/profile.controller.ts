import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDTO } from './dto/createProfile.dto';
import { ProfileService } from './profile';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller()
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    const profile = await this.profileService.getProfileByUserId(
      req.user.userId,
    );
    if (!profile) throw new NotFoundException('User profile not found');
    return profile;
  }

  @Post('createProfile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'coverPhoto', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/profile',
          filename: (_, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileName = uniqueSuffix + extname(file.originalname);
            cb(null, fileName);
          },
        }),
      },
    ),
  )
  async createProfile(
    @Req() req,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      coverPhoto?: Express.Multer.File[];
    },
    @Body(new ValidationPipe()) createProfileDto: CreateProfileDTO,
  ) {
    const photoPath = files?.photo?.[0]?.path;
    const coverPhotoPath = files?.coverPhoto?.[0]?.path;
    return await this.profileService.createProfile({
      createProfileDto,
      userId: req.user.userId,
      coverPhoto: coverPhotoPath,
      photo: photoPath,
    });
  }

  @Put('updateProfile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(
    @Req() req,
    @Body(new ValidationPipe()) createProfileDto: CreateProfileDTO,
  ) {
    const profile = await this.profileService.getProfileByUserId(
      req.user.userId,
    );

    if (!profile) throw new NotFoundException('User profile not found');
    await this.profileService.updateProfile(createProfileDto, req.user.userId);
    return 'Profile updated successfully';
  }
}
