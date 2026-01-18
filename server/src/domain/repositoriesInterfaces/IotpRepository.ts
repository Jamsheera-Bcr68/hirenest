import { IOtpDocument } from "../../infrastructure/database/models/user/otpModel"

export interface IOtpRepository{
    save(email:string,otp:string):Promise<void>
    verifyOtp(email:string,otp:string):Promise<Boolean>
}