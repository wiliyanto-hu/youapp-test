import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

export const convertPhotoToBase64 = (filePath: string | undefined) => {
  if (!filePath) return null;
  const normalizedPath = path.normalize(filePath);
  if (!existsSync(normalizedPath)) return null;
  const file = readFileSync(filePath);
  return `data:image/${path.extname(filePath).slice(1)};base64,${file.toString('base64')}`;
};
