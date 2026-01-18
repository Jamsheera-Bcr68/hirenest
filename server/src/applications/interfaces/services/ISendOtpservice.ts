export interface ISendOtpUsecase {
  execute(userId: string, email: string): void;
}
//   resendOtp(userId: string, email: string): Promise<void>;
//   verifyOtp(userId: string, otp: string): Promise<string>;
