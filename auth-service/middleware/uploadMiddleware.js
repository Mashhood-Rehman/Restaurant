const cloudinary = require('cloudinary').v2;
const path = require('path');
const multer = require('multer');
const {CloudinaryStorage} = require("multer-storage-cloudinary")
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

function uploadMiddleware(folderName) {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: (req, file) => {
                const folderPath = `${folderName  || "folder"}`;
                const fileExtension = path.extname(file.originalname).substring(1);
                const publicId = `${file.fieldname}-${Date.now()}`;
                return {
                    folder: folderPath,
                    format:fileExtension,
                    public_id: publicId,
                }
        }
    })
    return multer({
        storage: storage,
        limits: {
            fileSize: 5 * 1024 * 1024,
        }
    })
}
        
module.exports = uploadMiddleware;  