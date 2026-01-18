import { loginSchema } from "../validators/loginValidation";
import { Request,Response,NextFunction } from "express";
export const loginValidator=(req:Request,res:Response,next:NextFunction)=>{
try{
const result=loginSchema.parse(req.body)
next()
}catch(err){
    console.log(err);
    next(err)
}
}