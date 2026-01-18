export interface IVerifyOtpUsecase{
    execute(email:string,otp:string):Promise<Boolean>
}