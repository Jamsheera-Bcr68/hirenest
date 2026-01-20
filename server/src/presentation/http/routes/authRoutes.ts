import express from "express";
import {otpValidator, registerValidator,resendOtpValidator} from  '../middleweres/registerValidator'
import { loginValidator } from "../middleweres/loginValidator";
import { authController } from "../../../infrastructure/config/di";

const router=express.Router()
router.use((req, res, next) => {
  console.log(" Entered authRoutes:", req.method, req.url);
  next();
});

router.post('/register',registerValidator,authController.register)
router.post('/otp',otpValidator,authController.verifyOtp)
router.post('/resend-otp',resendOtpValidator,authController.resendOtp)
router.post('/login',loginValidator,authController.login)

export default router