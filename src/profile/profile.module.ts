import { Module } from '@nestjs/common';
import { ProfileService } from './profile';
import { ProfileController } from './profile.controller';
import { ProfileSchema } from './profile.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
