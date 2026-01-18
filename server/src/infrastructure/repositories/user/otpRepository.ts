import { otpModel, IOtpDocument } from "../../database/models/user/otpModel";
import { IOtpRepository } from "../../../domain/repositoriesInterfaces/IotpRepository";
import { Model } from "mongoose";
import { GenericRepository } from "../genericRepository";

export class OtpRepository implements IOtpRepository {
  private _model: Model<IOtpDocument>;

  constructor() {
    this._model = otpModel;
  }
  async save(email: string, otp: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);
    const record = await this._model.create({
      email: email,
      otp: otp,
      expiredAt: expiresAt,
      createdAt: new Date(),
    });

    console.log(`user from otp repository email ${email} ${otp} ${record}`);
  }
  async verifyOtp(email: string, otp: string): Promise<Boolean> {
    const user = await otpModel.findOne({ email });
    if (!user) throw new Error("user not found");
    if (!user?.otp || !user.expiredAt || new Date() > user.expiredAt)
      throw new Error("OTP_EXPIRED");

    const isValid = user?.otp === otp;
    console.log("is valid ", isValid);
    if (!isValid) {
      throw new Error("Invalid OTP");
    }
    user.isVerified = true;
    await user.save();
    return true;
  }
}
