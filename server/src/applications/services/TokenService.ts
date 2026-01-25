import { ITokenService } from "../interfaces/services/ITokenService";
import { getToken,getRefreshToken,verifyRefreshToken } from "../../infrastructure/services/tokenService";

export class TokenService implements ITokenService{
generateAccessToken(userId: string,email:string): string {
    const token=getToken(userId,email)
    console.log('token from token service ',token);
    
    return token
}
generateRefreshToken(userId: string,email:string): string {
    const token=getRefreshToken(userId,email)
    return token
}
verifyRefreshToken(token: string):  {userId:string,email:string} {

    console.log('from token servise verify token');
    const payload=verifyRefreshToken(token)
   return payload
}
}