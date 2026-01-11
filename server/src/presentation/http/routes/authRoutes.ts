import express from "express";
import {registerValidator} from '../validators/registerValidator'
import { AuthController } from "../controllers/auth/authController";
import { authController } from "../../../infrastructure/config/di";
const router=express.Router()
router.use((req, res, next) => {
  console.log(" Entered authRoutes:", req.method, req.url);
  next();
});

router.post('/register',authController.register)

export default router