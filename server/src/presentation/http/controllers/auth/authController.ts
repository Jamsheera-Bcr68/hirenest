import { IRegisterUseCase } from "../../../../applications/interfaces/auth/IUserRegisterUseCase";
import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../../../../shared/enums/statusCodes";
import { authMessages } from "../../../../shared/constants/messages/authMesages";
import { IUserLoginUseCase } from "../../../../applications/interfaces/auth/IUserLoginUseCase";
import { comparePassword } from "../../../../infrastructure/services/passwordHasher";
import { ISendOtpService } from "../../../../applications/interfaces/services/ISendOtpservice";
import { IVerifyOtpService } from "../../../../applications/interfaces/services/IVerifyOtpUsecase";

import { AppError } from "../../../../domain/errors/AppError";

export class AuthController {
  private _registerUseCase: IRegisterUseCase;
  private _loginUseCase: IUserLoginUseCase;
  private _sendOtpService: ISendOtpService;
  private _verifyOtpService: IVerifyOtpService;
  constructor(
    registerUseCase: IRegisterUseCase,
    loginUseCase: IUserLoginUseCase,
    sendOtpServce: ISendOtpService,
    verifyOtpService: IVerifyOtpService,
  ) {
    console.log("from auth  controller constructor");
    this._registerUseCase = registerUseCase;
    this._sendOtpService = sendOtpServce;
    this._loginUseCase = loginUseCase;
    this._verifyOtpService = verifyOtpService;
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    console.log("register controller");

    try {
      const payload = req.body;
      const pendingUser = await this._registerUseCase.execute(payload);
      console.log("user", pendingUser);
      const otp_expiry = await this._sendOtpService.execute(pendingUser.email);
      console.log("otp expiry from aut conroller", otp_expiry);
      res.status(statusCodes.CREATED).json({
        sucess: true,
        message: authMessages.success.PENDING_SIGNUP,
        otp_expiry: otp_expiry,
      });
    } catch (err) {
      next(err);
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    console.log("from auth  controller verify otp");

    try {
      await this._verifyOtpService.execute(payload.email, payload.otp);

      return res
        .status(statusCodes.OK)
        .json({ success: true, message: authMessages.success.OTP_VERIFIED });
    } catch (error: any) {
      console.log("error is ", error.message);

      next(new AppError(error.message, 400));
    }
  };
  resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    console.log("from auth controller email is ", email);

    const otp_expiry = await this._sendOtpService.execute(email);

    return res.status(statusCodes.OK).json({
      success: true,
      message: authMessages.success.OTP_RESEND,
      otp_expiry: otp_expiry,
    });
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    console.log("from login controller");
    try {
      const payload = req.body;
      const { user, refreshToken, accessToken } =
        await this._loginUseCase.execute(payload);

      console.log(" response from authcontroller");

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        path: "/auth/refresh-token",
      });
      return res.status(statusCodes.OK).json({
        success: true,
        message: authMessages.success.LOGIN_SUCCESS,
        data: { user, accessToken },
      });
    } catch (err) {
      next(err);
    }
  };
 
}
