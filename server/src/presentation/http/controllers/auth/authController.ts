import { IRegisterUseCase } from "../../../../applications/interfaces/auth/IUserRegisterUseCase";
import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../../../../shared/enums/statusCodes";
import { authMessages } from "../../../../shared/constants/messages/authMesages";
import { IUserLoginUseCase } from "../../../../applications/interfaces/auth/IUserLoginUseCase";
import { comparePassword } from "../../../../infrastructure/services/passwordHasher";
import { ISendOtpUsecase } from "../../../../applications/interfaces/services/ISendOtpservice";
import { IVerifyOtpUsecase } from "../../../../applications/interfaces/services/IVerifyOtpUsecase";

import { AppError } from "../../../../domain/errors/AppError";
import { email, success } from "zod";

export class AuthController {
  private _registerUseCase: IRegisterUseCase;
  private _loginUseCase: IUserLoginUseCase;
  private _sendOtpUsecase: ISendOtpUsecase;
  private _verifyOtpUsecase: IVerifyOtpUsecase;
  constructor(
    registerUseCase: IRegisterUseCase,
    loginUseCase: IUserLoginUseCase,
    sendOtpUsecase: ISendOtpUsecase,
    verifyOtpUsecase: IVerifyOtpUsecase,
  ) {
    console.log("from auth  controller constructor");
    this._registerUseCase = registerUseCase;
    this._sendOtpUsecase = sendOtpUsecase;
    this._loginUseCase = loginUseCase;
    this._verifyOtpUsecase = verifyOtpUsecase;
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    console.log("register controller");

    try {
      const payload = req.body;
      const pendingUser = await this._registerUseCase.execute(payload);
      console.log("user", pendingUser);
      this._sendOtpUsecase.execute(String(pendingUser._id), pendingUser.email);

      res.status(statusCodes.CREATED).json({
        sucess: true,
        message: authMessages.success.PENDING_SIGNUP,
      
      });
    } catch (err) {
      next(err);
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    console.log("from auth  controller verify otp");

    try {
      await this._verifyOtpUsecase.execute(payload.email, payload.otp);
      
      return res
        .status(statusCodes.OK)
        .json({ success: true, message: authMessages.success.OTP_VERIFIED });
    } catch (error:any) {
      console.log("error is ", error.message);

      next(new AppError(error.message,400));
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    console.log("from login controller");
    try {
      const payload = req.body;
      const user = await this._loginUseCase.execute(payload);
      if (user) {
        console.log("user found ", user);
        let isMatch: Boolean = await comparePassword(
          payload.password,
          user.password,
        );
        if (!isMatch)
          throw new AppError(
            authMessages.error.BAD_REQUEST,
            statusCodes.BADREQUEST,
          );
        return res.status(statusCodes.OK).json({
          success: true,
          message: authMessages.success.LOGIN_SUCCESS,
          data: user,
        });
      } else {
        throw new AppError(
          authMessages.error.BAD_REQUEST,
          statusCodes.BADREQUEST,
        );
      }
    } catch (err) {
      next(err);
    }
  };
}
