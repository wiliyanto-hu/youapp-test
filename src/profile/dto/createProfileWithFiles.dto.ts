import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProfileDTO } from './createProfile.dto';

export class CreateProfileWithFilesDTO extends CreateProfileDTO {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  photo?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  coverPhoto?: any;
}
