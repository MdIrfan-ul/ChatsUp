import multer from "multer";

export const upload = multer({
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now().toString().slice(0, 10) + '-' + file.originalname;
        cb(null, uniqueSuffix);
      }
  }),
  limits: { fileSize: 3 * 1024 * 1024 } // 3MB limit
}).single('profilePicture');

// Middleware to handle Multer errors
export const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ success: false, message: 'File size is too large. Max limit is 3MB.' });
      }
      return res.status(400).json({ success: false, message: `Multer error: ${err.message}` });
  }
  next(err); // Pass to the next error handler
};

