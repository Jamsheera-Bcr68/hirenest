import { Types, Schema, model, Model } from "mongoose";
import { userRole } from "../../../../domain/enums/userEnums";

export interface IUserDocument {
  _id: Types.ObjectId;
  password: string;
  role?: userRole;
  email: string;
  phone: string;
 // otp: string;
 // otpExpiredAt: Date;
  isVerified: boolean;
  fullName?: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  isBlocked: boolean;
}

const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isVerified: { type: Boolean, required: true, default: false },
  isBlocked: { type: Boolean, default: false },
 //otp:{type:String},
  //otpExpiredAt:{type:Date}

});
export const userModel: Model<IUserDocument> = model<IUserDocument>(
  "User",
  userSchema
);
