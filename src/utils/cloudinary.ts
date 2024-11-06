import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse} from 'cloudinary';
import { promisify } from 'util';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadAsync = promisify(cloudinary.uploader.upload);
export const cloudinaryUpload = async (file: string): Promise<{ res: string | undefined }> => {
  try {
    const result = await uploadAsync(file);
    return {
      res: result?.secure_url,
    };
  } catch (error) {
    throw error;
  }
};
