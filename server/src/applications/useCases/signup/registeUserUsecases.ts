import { IRegisterUseCase } from "../../interfaces/register/IUserRegisterUseCase";
import {IRegisterInput,IRegisterOutput} from '../../Dtos/registerTypes'
import { IUserRepository } from "../../../domain/repositoriesInterfaces/IUserRepositories";
import {authMessages} from '../../../shared/constants/messages/authMesages'
import {statusCodes} from '../../../shared/enums/statusCodes'
import {hashedPassword} from '../../../shared/services/passwordHasher'
import { User } from "../../../domain/entities/User";

export class RegisterUseCase implements IRegisterUseCase{
 private _userRepository:IUserRepository
 constructor (userRepository:IUserRepository){
    this._userRepository=userRepository
 }
    async execute(request:IRegisterInput):Promise<IRegisterOutput> {
        const userExist=await this._userRepository.findByEmail(request.email)
        if(userExist)throw new Error(authMessages.error.CONFLICT)
            const password=await hashedPassword(request.password)
            const user=  new User(request.email,password,request.phone)
            this._userRepository.createUser(user)
        

return 'Register successful'
    } 
}