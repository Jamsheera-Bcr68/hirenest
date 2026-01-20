import mongoose, { Model, model, Types } from "mongoose";

export interface IOtpDocument {
  email: String;
  otp: string;
  isVerified: boolean;
  createdAt: Date;
  expiredAt: Date;
}
const otpSchema = new mongoose.Schema<IOtpDocument>({
  email: { type: String, required: true,unique:true},
  otp: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  expiredAt: { type: Date, required: true },
  createdAt: { type: Date },
});

export const otpModel: Model<IOtpDocument> = model<IOtpDocument>(
  "OTP",
  otpSchema,
);
