import multer from "multer";

const MAX_FILE_SIZE = 40 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG allowed."), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

export const uploadSingleImage = (fieldName) => upload.single(fieldName);
export const uploadMultipleImages = (fieldName, maxCount = 6) =>
  upload.array(fieldName, maxCount);
