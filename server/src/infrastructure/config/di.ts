//usecases
import { RegisterUseCase } from "../../applications/useCases/auth/registeUserUsecases";
import { AdminGoogleAuthUsecase } from "../../applications/useCases/auth/adminGoogleAuthUsecase";
import { LoginUseCase } from "../../applications/useCases/auth/loginUserUsecase";

import { AdminLoginUsecase } from "../../applications/useCases/auth/adminLoginUsecase";
import { ForgotPassWordUsecase } from "../../applications/useCases/auth/forgotPasswordUsecase";
import { ResetPasswordUsecase } from "../../applications/useCases/auth/resetPasswordUsecase";
import { GoogleLoginUsecase } from "../../applications/useCases/auth/googleLoginUsecase";

//==Controllers

import { AuthController } from "../../presentation/http/controllers/auth/authController";
import { RefreshTokenController } from "../../presentation/http/controllers/auth/refreshTokenController";
import { AdminAuthController } from "../../presentation/http/controllers/auth/adminAuthController";
import { ForgotPassWordController } from "../../presentation/http/controllers/auth/forgotPasswordController";
import { ResetPasswordController } from "../../presentation/http/controllers/auth/resetPasswordController";
import { GoogleLoginController } from "../../presentation/http/controllers/auth/googleLoginController";
import { AdminGoogleAuthController } from "../../presentation/http/controllers/auth/AdminGoogleLoginController";

//==repsitories

import { UserRepository } from "../repositories/user/userRepository";
import { OtpRepository } from "../repositories/user/otpRepository";
import { AdminRepository } from "../repositories/admin/adminRepository";

//services

import { OtpGenerator } from "../services/otpgenerator";
import { EmailService } from "../../applications/services/emailService";
import { TokenService } from "../../applications/services/TokenService";
import { SendOtpService } from "../../applications/services/sendOtpServices";
import { VerifyOtpService } from "../../applications/services/verifyOtpService";
import { GoogleAuthService } from "../../applications/services/googleAuthService";

const userRepository = new UserRepository();
const otpGenerator = new OtpGenerator();
const otpRepository = new OtpRepository();
const adminRepository = new AdminRepository();

const emailService = new EmailService();
const verifyOtpService = new VerifyOtpService(otpRepository, userRepository);
const tokenService = new TokenService();
const googleAuthService =new GoogleAuthService()

const registerUseCase = new RegisterUseCase(userRepository);
const sendOtpService = new SendOtpService(
  otpGenerator,
  emailService,
  otpRepository,
);
const loginUseCase = new LoginUseCase(userRepository, tokenService);
const adminLoginUsecase = new AdminLoginUsecase(adminRepository, tokenService);
const forgotPasswordUsecase = new ForgotPassWordUsecase(
  userRepository,
  emailService,
);
const resetPasswordUsecase=new ResetPasswordUsecase(userRepository)
const googleLoginUsecase=new GoogleLoginUsecase(userRepository,googleAuthService,tokenService)
const adminGoogleAuthUsecase=new AdminGoogleAuthUsecase(googleAuthService,adminRepository,tokenService)


export const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  sendOtpService,
  verifyOtpService,
);
export const refreshController = new RefreshTokenController(tokenService);
export const adminAuthController = new AdminAuthController(adminLoginUsecase);
export const forgotPasswordController = new ForgotPassWordController(
  forgotPasswordUsecase,
);
export const resetPasswordController=new ResetPasswordController(resetPasswordUsecase)
export const googleLoginController=new GoogleLoginController(googleLoginUsecase)
export const adminGoogleAuthController=new AdminGoogleAuthController(adminGoogleAuthUsecase)
