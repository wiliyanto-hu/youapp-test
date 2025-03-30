import { Module } from '@nestjs/common';
import { Profile } from './profile';
import { ProfileController } from './profile.controller';

@Module({
  providers: [Profile],
  controllers: [ProfileController]
})
export class ProfileModule {}
