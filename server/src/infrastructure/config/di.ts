
import { RegisterUseCase } from "../../applications/useCases/signup/registeUserUsecases";
import { IRegisterUseCase } from "../../applications/interfaces/register/IUserRegisterUseCase";

//==Controllers

import { AuthController } from "../../presentation/http/controllers/auth/authController";
console.log("🧩 DI container loaded");
//==repsitories
import { IUserRepository } from "../../domain/repositoriesInterfaces/IUserRepositories";
import { UserRepository } from "../repositories/user/userRepository";
 


const userRepository=new UserRepository()
const registerUseCase=new RegisterUseCase(userRepository)

export const  authController =new AuthController(registerUseCase)































































































