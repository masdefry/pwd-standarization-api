import fs from 'fs';

export const deleteFiles = ({ files }: { files: Express.Multer.File[] }) => {
  files.forEach((file) => {
    try {
      fs.rmSync(file.path);
    } catch (err) {
      return err;
    }
  });
};
