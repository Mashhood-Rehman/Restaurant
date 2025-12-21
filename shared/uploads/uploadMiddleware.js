const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary, initCloudinary } = require("./cloudinary");

const uploadMiddleware = (options = {}) => {
  initCloudinary();

  const {
    folder = "uploads",
    maxSizeMB = 5,
    allowedFormats,
  } = options;

  const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      const ext = path.extname(file.originalname).substring(1);

      if (allowedFormats && !allowedFormats.includes(ext)) {
        throw new Error("Invalid file format");
      }

      return {
        folder,
        format: ext,
        public_id: `${file.fieldname}-${Date.now()}`,
      };
    },
  });

  return multer({
    storage,
    limits: {
      fileSize: maxSizeMB * 1024 * 1024,
    },
  });
};

module.exports = uploadMiddleware;
