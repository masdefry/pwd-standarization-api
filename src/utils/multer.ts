import multer from 'multer';

interface IUploadMulterProps{
    storageType: string
}

export const uploadMulter = ({storageType}: IUploadMulterProps) => {
    const storage = storageType === 'memory'? 
            multer.memoryStorage()
        :
            multer.diskStorage({
                destination: function (req, file, cb){
                    cb(null, 'src/public/images')
                },
                filename: function (req, file, cb){
                    const splitOriginalName = file.originalname.split('.')
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + splitOriginalName[splitOriginalName.length-1]) // images-Date.now-Math.round()
                }
            })
    
    const fileFilter = (req: any, file: any, cb: any) => {
        const extensionAccepted = ['png', 'jpg', 'jpeg', 'webp', 'svg']
    
        const splitOriginalName = file.originalname.split('.')
        if(!extensionAccepted.includes(splitOriginalName[splitOriginalName.length-1])){
            return cb(new Error('File Format Not Acceptable'))
        }
    
        return cb(null, true)
    }

    return multer({storage: storage, fileFilter: fileFilter, limits: {fileSize: 2000000}})
} 