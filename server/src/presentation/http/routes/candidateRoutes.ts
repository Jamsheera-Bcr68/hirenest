import express from 'express'
import { profileValidator } from '../middleweres/profileValidator'
import { authValidator } from '../middleweres/authValidator'
import { tokenService } from '../../../infrastructure/config/di'
import { candidateProfileController } from '../../../infrastructure/config/di'

const router=express.Router()

router.post('/profile',profileValidator,authValidator(tokenService),candidateProfileController.editProfile)


export default router



