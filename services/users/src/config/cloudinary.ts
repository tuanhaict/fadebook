import multer from 'multer'
const cloudinary = require('cloudinary').v2

const cloud_name= process.env.CLOUD_NAME!;
const api_key = process.env.CLOUDINARY_API_KEY!
const api_secret = process.env.CLOUDINARY_API_SECRET!
cloudinary.config({
    api_key,
    api_secret,
    cloud_name,
})
export const parseFile = (type: string) => multer({storage: multer.diskStorage({})}).single(type);
export const uploadFile = async (type: string, image: any) => {
    const result = await cloudinary.uploader.upload(image, {
        folder: `fadebook/${type}s`,
        use_filename: true,
    });
    return result;
}