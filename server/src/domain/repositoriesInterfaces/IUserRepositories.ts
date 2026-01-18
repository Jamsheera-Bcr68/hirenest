import {User} from '../entities/User'
export interface IUserRepository{
findByEmail(email:string):Promise<User|null>
createUser(user:User):Promise<User>
verifyUser(email:string):Promise<void>
}