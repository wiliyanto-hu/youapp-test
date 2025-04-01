import {
  Body,
  Controller,
  Get,
  Post,
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
  getProfile(@Req() req) {
    return { message: `Hello, ${req.user.username}!`, userId: req.user.userId };
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
}
