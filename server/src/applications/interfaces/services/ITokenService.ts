export interface ITokenService{
    generateAccessToken(userId:string):string
    //verifyAccessToken(token:string):{userId:string}
}