import { CreateProfileDTO } from '../dto/createProfile.dto';
export interface CreateProfileParams {
  createProfileDto: CreateProfileDTO;
  userId: string;
  photo?: string | undefined;
  coverPhoto?: string | undefined;
}
