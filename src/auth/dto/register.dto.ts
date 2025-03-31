import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 6 characters' })
  password: string;
}
