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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDTO } from './dto/createProfile.dto';
import { ProfileService } from './profile';

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
  async createProfile(
    @Req() req,
    @Body(new ValidationPipe()) createProfileDto: CreateProfileDTO,
  ) {
    return await this.profileService.createProfile(
      createProfileDto,
      req.user.userId,
    );
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
