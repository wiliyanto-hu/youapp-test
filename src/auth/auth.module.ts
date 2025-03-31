import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth } from './auth';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [Auth],
})
export class AuthModule {}
