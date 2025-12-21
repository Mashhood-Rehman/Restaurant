const cloudinary = require("cloudinary").v2;

let isConfigured = false;

const initCloudinary = () => {
  if (isConfigured) return;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  isConfigured = true;
};

module.exports = {
  cloudinary,
  initCloudinary,
};
