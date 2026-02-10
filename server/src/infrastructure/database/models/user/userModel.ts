import { Types, Schema, model, Model, Document } from 'mongoose';
import { UserRole } from '../../../../domain/enums/userEnums';
import {
  IAddress,
  ISocialMediaLinks,
} from '../../../../domain/values/profileTypes';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  password: string;
  role?: UserRole;
  email: string;
  phone: string;
  googleId?: string;
  isVerified: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  name?: string;
  title?: string;
  address?: IAddress;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  isBlocked: boolean;
  socialMediaLinks: ISocialMediaLinks;
}

const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
    default: UserRole.CANDIDATE,
  },

  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  name: { type: String },
  title: { type: String },
  address: {
    type: { place: String, state: String, country: String },
  },
  isVerified: { type: Boolean, required: true, default: false },
  isBlocked: { type: Boolean, default: false },
  googleId: { type: String },
  socialMediaLinks: {
    type: {
      linkedIn: String,
      whatsapp: String,
      youtube: String,
      gitHub: String,
      twitter: String,
      portfolio: String,
    },
  },
});
export const userModel: Model<IUserDocument> = model<IUserDocument>(
  'User',
  userSchema
);
