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
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum WeightUnit {
  KG = 'kg',
}

export enum HeightUnit {
  CM = 'cm',
  INCHES = 'inches',
}

export class CreateProfileDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(['male', 'female'])
  @IsNotEmpty()
  @ApiProperty()
  gender: 'male' | 'female';

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Birthday must be a valid date' })
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Height must be a positive number' })
  height: number;

  @ApiProperty()
  @IsEnum(HeightUnit, {
    message: `heightUnit must be one of the following values: ${Object.values(HeightUnit).join(', ')}`,
  })
  heightUnit: 'cm' | 'inches';

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Weight must be a positive number' })
  weight: number;

  @ApiProperty()
  @IsEnum(WeightUnit, {
    message: `weightUnit must be one of the following values: ${Object.values(WeightUnit).join(', ')}`,
  })
  weightUnit: 'kg';

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}
