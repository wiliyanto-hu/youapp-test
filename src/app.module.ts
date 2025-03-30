import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [AuthModule, ProfileModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
