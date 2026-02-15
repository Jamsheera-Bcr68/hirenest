//*==================  usecases    ================*
//auth
import { RegisterUseCase } from '../../applications/useCases/auth/registerUserUsecases';
import { AdminGoogleAuthUsecase } from '../../applications/useCases/auth/adminGoogleAuthUsecase';
import { LoginUseCase } from '../../applications/useCases/auth/loginUserUsecase';
import { LogoutUsecase } from '../../applications/useCases/auth/logoutUsecase';
import { AdminLoginUsecase } from '../../applications/useCases/auth/adminLoginUsecase';
import { ForgotPassWordUsecase } from '../../applications/useCases/auth/forgotPasswordUsecase';
import { ResetPasswordUsecase } from '../../applications/useCases/auth/resetPasswordUsecase';
import { GoogleLoginUsecase } from '../../applications/useCases/auth/googleLoginUsecase';
import { ChangePasswordUsecase } from '../../applications/useCases/auth/ChangePasswordUsecase';

//candidate

import { CandidateProfileEditUsecase } from '../../applications/useCases/candidate/CandidateProfileEditUsecase';
import { GetUserUseCase } from '../../applications/useCases/user/GetUserUseCase';
import { EditProfileImageUseCase } from '../../applications/useCases/user/EditProfileImageUseCase';
import { RemoveProfileImageUseCase } from '../../applications/useCases/user/RemoveProfileImageUseCase';
import { EditAboutUseCase } from '../../applications/useCases/candidate/EditAboutUseCase';
import { AddSkillsToProfieUseCase } from '../../applications/useCases/candidate/AddSkillstoProfileUseCase';
import { RemoveSkillFromProfileUseCase } from '../../applications/useCases/candidate/RemoveSkillFromProfileUseCase';
//user
//skills
import { GetAllSkillsUseCase } from '../../applications/useCases/skills/GetAllSkillsUseCase';
//==Controllers
//auth
import { AuthController } from '../../presentation/http/controllers/auth/authController';
import { RefreshTokenController } from '../../presentation/http/controllers/auth/refreshTokenController';
import { AdminAuthController } from '../../presentation/http/controllers/auth/adminAuthController';
import { ForgotPassWordController } from '../../presentation/http/controllers/auth/forgotPasswordController';
import { ResetPasswordController } from '../../presentation/http/controllers/auth/resetPasswordController';
import { GoogleLoginController } from '../../presentation/http/controllers/auth/googleLoginController';
import { AdminGoogleAuthController } from '../../presentation/http/controllers/auth/AdminGoogleLoginController';
import { ChangePasswordController } from '../../presentation/http/controllers/auth/ChangePasswordController';



//candidate
import { CandidateProfileController } from '../../presentation/http/controllers/candidate/CandidateProfileController';
import { SkillsController } from '../../presentation/http/controllers/SkillsController';
//==repsitories

import { UserRepository } from '../repositories/user/userRepository';
import { OtpRepository } from '../repositories/user/otpRepository';
import { AdminRepository } from '../repositories/admin/adminRepository';
import { SkillRepository } from '../repositories/user/SkillsRepository';

//services

import { OtpGenerator } from '../services/otpgenerator';
import { EmailService } from '../../applications/services/emailService';
import { TokenService } from '../../applications/services/TokenService';
import { SendOtpService } from '../../applications/services/sendOtpServices';
import { VerifyOtpService } from '../../applications/services/verifyOtpService';
import { GoogleAuthService } from '../../applications/services/googleAuthService';
import { ImageStorageService } from '../services/ImageStorageService';

//repositories
const userRepository = new UserRepository();
const otpGenerator = new OtpGenerator();
const otpRepository = new OtpRepository();
const adminRepository = new AdminRepository();
const skillRepository = new SkillRepository();

const emailService = new EmailService();
const verifyOtpService = new VerifyOtpService(otpRepository, userRepository);
export const tokenService = new TokenService();
const googleAuthService = new GoogleAuthService();
const imageStorageService = new ImageStorageService();

const registerUseCase = new RegisterUseCase(userRepository);
const sendOtpService = new SendOtpService(
  otpGenerator,
  emailService,
  otpRepository
);
const loginUseCase = new LoginUseCase(userRepository, tokenService);
const adminLoginUsecase = new AdminLoginUsecase(adminRepository, tokenService);
const forgotPasswordUsecase = new ForgotPassWordUsecase(
  userRepository,
  emailService
);
const resetPasswordUsecase = new ResetPasswordUsecase(userRepository);
const googleLoginUsecase = new GoogleLoginUsecase(
  userRepository,
  googleAuthService,
  tokenService
);
const adminGoogleAuthUsecase = new AdminGoogleAuthUsecase(
  googleAuthService,
  adminRepository,
  tokenService
);
const logoutUseCase = new LogoutUsecase();
const changePasswordUsecase = new ChangePasswordUsecase(userRepository);

//candidate
const candidateEditProfileUsecase = new CandidateProfileEditUsecase(
  userRepository
);
const addSkilltoProfileUseCase=new AddSkillsToProfieUseCase(userRepository,skillRepository)
const removeSkillFromProfileUseCase=new RemoveSkillFromProfileUseCase(userRepository)

//user
const getUserUserCase = new GetUserUseCase(userRepository);
const editProfileImageUseCase = new EditProfileImageUseCase(
  userRepository,
  imageStorageService
);
const removeProfileImageUseCase = new RemoveProfileImageUseCase(
  userRepository,
  imageStorageService
);
const editAboutUsecase = new EditAboutUseCase(userRepository);

//skills
const getAllSkillsUseCase = new GetAllSkillsUseCase(skillRepository);

export const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  sendOtpService,
  verifyOtpService,
  logoutUseCase
);
export const refreshController = new RefreshTokenController(tokenService);
export const adminAuthController = new AdminAuthController(adminLoginUsecase);
export const forgotPasswordController = new ForgotPassWordController(
  forgotPasswordUsecase
);
export const resetPasswordController = new ResetPasswordController(
  resetPasswordUsecase
);
export const googleLoginController = new GoogleLoginController(
  googleLoginUsecase
);
export const adminGoogleAuthController = new AdminGoogleAuthController(
  adminGoogleAuthUsecase
);

export const changePasswordController = new ChangePasswordController(
  changePasswordUsecase
);

export const candidateProfileController = new CandidateProfileController(
  candidateEditProfileUsecase,
  getUserUserCase,
  editProfileImageUseCase,
  removeProfileImageUseCase,
  editAboutUsecase,
  addSkilltoProfileUseCase,
  removeSkillFromProfileUseCase
);

export const skillController=new SkillsController(getAllSkillsUseCase)
