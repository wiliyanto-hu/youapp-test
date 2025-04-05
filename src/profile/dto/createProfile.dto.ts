import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum WeightUnit {
  KG = 'kg',
}

export enum HeightUnit {
  CM = 'cm',
  INCHES = 'inches',
}

export class CreateProfileDTO {
  @IsNotEmpty()
  name: string;

  @IsEnum(['male', 'female'])
  @IsNotEmpty()
  gender: 'male' | 'female';

  @Type(() => Date)
  @IsDate({ message: 'Birthday must be a valid date' })
  @IsNotEmpty()
  birthday: Date;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Height must be a positive number' })
  height: number;

  @IsEnum(HeightUnit, {
    message: `heightUnit must be one of the following values: ${Object.values(HeightUnit).join(', ')}`,
  })
  heightUnit: 'cm' | 'inches';

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Weight must be a positive number' })
  weight: number;

  @IsEnum(WeightUnit, {
    message: `weightUnit must be one of the following values: ${Object.values(WeightUnit).join(', ')}`,
  })
  weightUnit: 'kg';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}
