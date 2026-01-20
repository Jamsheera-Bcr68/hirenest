//usecases
import { RegisterUseCase } from "../../applications/useCases/auth/registeUserUsecases";
import {SendOtpService} from '../../applications/services/sendOtpServices'
import { LoginUseCase } from "../../applications/useCases/auth/loginUserUsecase";
import { VerifyOtpService} from "../../applications/services/verifyOtpUsecase";

//==Controllers

import { AuthController } from "../../presentation/http/controllers/auth/authController";

//==repsitories

import { UserRepository } from "../repositories/user/userRepository";
import { OtpRepository } from "../repositories/user/otpRepository";

//services

import { OtpGenerator } from "../services/otpgenerator";
import { EmailService } from "../services/emailService";


const userRepository = new UserRepository();
const otpGenerator=new OtpGenerator()
const otpRepository=new OtpRepository()
const emailService=new EmailService()
const verifyOtpService=new VerifyOtpService(otpRepository,userRepository)



const registerUseCase = new RegisterUseCase(userRepository);
const sendOtpService =new SendOtpService(otpGenerator,emailService,otpRepository)
const loginUseCase = new LoginUseCase(userRepository);

export const authController = new AuthController(registerUseCase, loginUseCase,sendOtpService,verifyOtpService);

