import express from "express";
import {otpValidator, registerValidator,resendOtpValidator} from  '../middleweres/registerValidator'
import { loginValidator,forgotPasswordValidator,resetPasswordValidator } from "../middleweres/loginValidator";
import { authController } from "../../../infrastructure/config/di";
import { refreshController } from "../../../infrastructure/config/di";
import { adminAuthController } from "../../../infrastructure/config/di";
import { forgotPasswordController } from "../../../infrastructure/config/di";
import { resetPasswordController } from "../../../infrastructure/config/di";

const router=express.Router()
router.use((req, res, next) => {
  console.log(" Entered authRoutes:", req.method, req.url);
  next();
});

router.post('/register',registerValidator,authController.register)
router.post('/otp',otpValidator,authController.verifyOtp)
router.post('/resend-otp',resendOtpValidator,authController.resendOtp)
router.post('/login',loginValidator,authController.login)
router.post('/refresh-token',refreshController.handle)

//adminroutes
router.post('/admin/login',loginValidator,adminAuthController.login)

//forgot password
router.post('/forgot-password',forgotPasswordValidator,forgotPasswordController.handle)
router.post('/reset-password',resetPasswordValidator,resetPasswordController.handle)

export default router