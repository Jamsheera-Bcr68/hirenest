import {IloginInput} from '../../Dtos/loginDto'
import {User} from '../../../domain/entities/User'
export interface IUserLoginUseCase{
    execute(input:IloginInput):Promise<User|null>
}