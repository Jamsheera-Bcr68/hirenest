export interface ITokenService{
    generateAccessToken(userId:string,email:string):string
    generateRefreshToken(userId:string,email:string):string
    verifyRefreshToken(token:string): {userId:string,email:string}
}