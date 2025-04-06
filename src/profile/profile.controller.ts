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
import { ProfileFileInterceptor } from './interceptors/photoUpload.interceptor';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateProfileWithFilesDTO } from './dto/createProfileWithFiles.dto';
@ApiBearerAuth('Authorization')
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
  @UseInterceptors(ProfileFileInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProfileWithFilesDTO,
  })
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
  @UseInterceptors(ProfileFileInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProfileWithFilesDTO,
  })
  async updateProfile(
    @Req() req,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      coverPhoto?: Express.Multer.File[];
    },
    @Body(new ValidationPipe()) createProfileDto: CreateProfileDTO,
  ) {
    const profile = await this.profileService.getProfileByUserId(
      req.user.userId,
    );

    if (!profile) throw new NotFoundException('User profile not found');
    const photoPath = files?.photo?.[0]?.path;
    const coverPhotoPath = files?.coverPhoto?.[0]?.path;

    await this.profileService.updateProfile({
      createProfileDto,
      userId: req.user.userId,
      coverPhoto: coverPhotoPath,
      photo: photoPath,
    });
    return 'Profile updated successfully';
  }
}
