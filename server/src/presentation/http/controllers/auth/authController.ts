import { IRegisterUseCase } from "../../../../applications/interfaces/register/IUserRegisterUseCase"
import { Request,Response,NextFunction } from "express"
import { statusCodes } from "../../../../shared/enums/statusCodes"
import { authMessages } from "../../../../shared/constants/messages/authMesages"

export class AuthController{
private _registerUseCase:IRegisterUseCase
constructor (registerUseCase:IRegisterUseCase){
    console.log('from auth  controller constructor');
    this._registerUseCase=registerUseCase
};
register=async(req:Request,res:Response,next:NextFunction)=>{
  console.log('register controller');
  
   try{
     const payload=req.body
     const registerToken=await this._registerUseCase.execute(payload)
     console.log('registerToken',registerToken);
     
     res.status(statusCodes.CREATED).json({sucess:true,message:authMessages.success.REGISTER_SUCCESS,data:{registerToken}})
   }catch(err){
    next(err)
   }
}
}