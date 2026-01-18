import { ISendOtpUsecase } from "../interfaces/services/ISendOtpservice";
import { IGenerateOtpService } from "../interfaces/services/IGeneratorOtpService";
import { IEmailService } from "../interfaces/services/IEmailService";
import { IOtpRepository } from "../../domain/repositoriesInterfaces/IotpRepository";

export class SendOtpUseCase implements ISendOtpUsecase {
  private readonly _otpGenerator: IGenerateOtpService;
  private readonly _emailServices: IEmailService;
  private readonly _otpRepository: IOtpRepository;
  constructor(
    otpGenerator: IGenerateOtpService,
      emailServices: IEmailService,
      otpRepository: IOtpRepository
  ) {
    this._otpGenerator = otpGenerator;
     this._emailServices = emailServices;
    this._otpRepository = otpRepository;
  }

  async execute(userId: string, email: string): Promise<void> {
    console.log(`from sendotp usecase `, email, userId);

    const otp = this._otpGenerator.generate();
    console.log("otp is ", otp);

    await this._otpRepository.save(email, otp);
      this._emailServices.sendOtp(email, otp);
  }
}
