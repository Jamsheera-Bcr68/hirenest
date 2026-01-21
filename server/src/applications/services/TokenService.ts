import { ITokenService } from "../interfaces/services/ITokenService";
import { getToken } from "../../infrastructure/services/tokenService";

export class TokenService implements ITokenService{
generateAccessToken(userId: string): string {
    const token=getToken(userId)
    console.log('token from token service ',token);
    
    return token
}
}