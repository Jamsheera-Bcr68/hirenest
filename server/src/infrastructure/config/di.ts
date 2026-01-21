//usecases
import { RegisterUseCase } from "../../applications/useCases/auth/registeUserUsecases";
import {SendOtpService} from '../../applications/services/sendOtpServices'
import { LoginUseCase } from "../../applications/useCases/auth/loginUserUsecase";
import { VerifyOtpService} from "../../applications/services/verifyOtpService";

//==Controllers

import { AuthController } from "../../presentation/http/controllers/auth/authController";

//==repsitories

import { UserRepository } from "../repositories/user/userRepository";
import { OtpRepository } from "../repositories/user/otpRepository";

//services

import { OtpGenerator } from "../services/otpgenerator";
import { EmailService } from "../services/emailService";
import { TokenService } from "../../applications/services/TokenService";


const userRepository = new UserRepository();
const otpGenerator=new OtpGenerator()
const otpRepository=new OtpRepository()
const emailService=new EmailService()
const verifyOtpService=new VerifyOtpService(otpRepository,userRepository)
const tokenService=new TokenService()



const registerUseCase = new RegisterUseCase(userRepository);
const sendOtpService =new SendOtpService(otpGenerator,emailService,otpRepository)
const loginUseCase = new LoginUseCase(userRepository,tokenService);

export const authController = new AuthController(registerUseCase, loginUseCase,sendOtpService,verifyOtpService);

