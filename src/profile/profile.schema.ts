import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ enum: ['male', 'female'] })
  gender: string;

  @Prop({ type: Date, required: true }) // Store as Date for better querying
  birthday: Date;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: number;

  @Prop({ enum: ['cm', 'inches'], default: 'cm' })
  heightUnit: 'cm' | 'inches';

  @Prop()
  weight: number;

  @Prop({ enum: ['kg'], default: 'kg' })
  weightUnit: 'kg';
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
