import { IsDate, IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfileDTO {
  @IsNotEmpty()
  name: string;

  @IsEnum(['male', 'female'])
  @IsNotEmpty()
  gender: 'male' | 'female';

  @Type(() => Date) // Converts incoming string to Date
  @IsDate({ message: 'Birthday must be a valid date' })
  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  horoscope: string;

  @IsNotEmpty()
  zodiac: string;

  @IsNumber()
  @Min(0, { message: 'Height must be a positive number' })
  height: number;

  @IsEnum(['cm', 'inches'])
  heightUnit: 'cm' | 'inches';

  @IsNumber()
  @Min(0, { message: 'Weight must be a positive number' })
  weight: number;

  @IsEnum(['kg'])
  weightUnit: 'kg';
}
