import express from 'express';
import { profileValidator } from '../middleweres/validatores/profileValidator';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import { candidateProfileController } from '../../../infrastructure/config/di';
import { upload } from '../middleweres/imageUpload';

const router = express.Router();

router.post(
  '/profile',
  profileValidator,
  authValidator(tokenService),
  candidateProfileController.editProfile
);
router.get(
  '/profile',
  authValidator(tokenService),
  candidateProfileController.getUser
);
router.patch('/profile/image',authValidator(tokenService),upload.single("image"),candidateProfileController.editProfileImage)

export default router;
