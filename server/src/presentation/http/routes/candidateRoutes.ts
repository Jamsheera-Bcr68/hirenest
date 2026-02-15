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
router.delete('/profile/image',authValidator(tokenService),candidateProfileController.removeProfileImage)
router.patch('/profile/about',authValidator(tokenService),candidateProfileController.addAbout)
router.patch('/profile/skills/add',authValidator(tokenService),candidateProfileController.addSkill)
router.patch('/profile/skills/remove/:skillId',authValidator(tokenService),candidateProfileController.removeSkill)

export default router;
