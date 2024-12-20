const multer = require("multer");
const path = require("path");

const imagesPath = path.join(__dirname, "..", "frontend", "src", "Images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
