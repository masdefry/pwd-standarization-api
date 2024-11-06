import fs from 'fs';

export const deleteFiles = ({imagesUploaded}: any) => {
    console.log(imagesUploaded)
    imagesUploaded.images.forEach((item: any) => {
        fs.rmSync(item.path)
    })
}