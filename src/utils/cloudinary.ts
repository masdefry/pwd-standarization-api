import { v2 as cloudinary } from 'cloudinary';
import { promisify } from 'util';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '../config';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadAsync = promisify(cloudinary.uploader.upload);
export const cloudinaryUpload = async (
  file: string
): Promise<{ res: string | undefined }> => {
  try {
    const result = await uploadAsync(file);
    return {
      res: result?.secure_url,
    };
  } catch (error) {
    throw error;
  }
};
