import { IloginInput } from "../../Dtos/loginDto";
import { IUserLoginUseCase } from "../../interfaces/auth/IUserLoginUseCase";
import { IUserRepository } from "../../../domain/repositoriesInterfaces/IUserRepositories";
import { User } from "../../../domain/entities/User";
import { AppError } from "../../../domain/errors/AppError";
import{comparePassword} from '../../../infrastructure/services/passwordHasher'
import { statusCodes } from "../../../shared/enums/statusCodes";
import { authMessages } from "../../../shared/constants/messages/authMesages";

export class LoginUseCase implements IUserLoginUseCase{
    private _userRepository:IUserRepository
    constructor(userRepository:IUserRepository){
        this._userRepository=userRepository
    }
    async execute(input: IloginInput): Promise<User|null> {
     
      const user:User|null=await  this._userRepository.findByEmail(input.email)
      if(!user)throw new AppError("user not found ", 401)
        if(!comparePassword(input.password,user.password))throw new AppError(authMessages.error.BAD_REQUEST,statusCodes.UNAUTHERIZED)
       return user
    }
}
