import {User} from '../entities/User'
export interface IUserRepository{
findByEmail(email:string):Promise<User|null>
createUser(user:User):Promise<User>
verifyUser(email:string):Promise<void>
updateResetToken(userId:string,hashedToken:string,resetTokenExpiry:Date):Promise<void>
updatePassword(email:string,password:string):Promise<void>
//findByGoogleId(token:string):Promise<User|null>
updateGoogleId(email:string,googleId:string):Promise<User|null>
}