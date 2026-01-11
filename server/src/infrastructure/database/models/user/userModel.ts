import {Types,Schema, model,Model} from 'mongoose'
import { userRole } from '../../../../domain/enums/userEnums'
export interface IUserDocument{
    _id:Types.ObjectId,
    password:string,
    role?:userRole,
    email:string,
  phone:string,
    fullName?:string
createdAt:Date,
updatedAt:Date,
imageUrl?:string
isBlocked:boolean
}

 const userSchema=new Schema<IUserDocument>( {

email:{type:String,required:true,unique:true},
password:{type:String,required:true},
phone:{type:String,required:true},
isBlocked:{type:Boolean,default:false},
})
export const userModel:Model< IUserDocument>=model<IUserDocument>('User',userSchema)