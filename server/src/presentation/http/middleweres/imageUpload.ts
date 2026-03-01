import multer from 'multer';
const storage = multer.memoryStorage();
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
