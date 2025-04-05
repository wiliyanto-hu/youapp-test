import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const ProfileFileInterceptor = () =>
  FileFieldsInterceptor(
    [
      { name: 'photo', maxCount: 1 },
      { name: 'coverPhoto', maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (_, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileName = uniqueSuffix + extname(file.originalname);
          cb(null, fileName);
        },
      }),
    },
  );
