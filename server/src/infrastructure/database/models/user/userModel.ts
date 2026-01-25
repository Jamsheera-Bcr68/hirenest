import { Types, Schema, model, Model, Document } from "mongoose";
import { UserRole } from "../../../../domain/enums/userEnums";

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  password: string;
  role?: UserRole;
  email: string;
  phone: string;
  googleId: string;
  isVerified: boolean;
  resetToken?:string,
  resetTokenExpiry?:Date,
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
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
    default: UserRole.ADMIN,
  },
  googleId: { type: String },
  resetToken:{type:String},
  resetTokenExpiry:{type:Date},
  isVerified: { type: Boolean, required: true, default: false },
  isBlocked: { type: Boolean, default: false },
});
export const userModel: Model<IUserDocument> = model<IUserDocument>(
  "User",
  userSchema,
);
