import { NextFunction, Request, Response } from "express";
import { IAdminLoginUsecase } from "../../../../applications/interfaces/auth/IAdminLoginUsecase";
import { statusCodes } from "../../../../shared/enums/statusCodes";
import { authMessages } from "../../../../shared/constants/messages/authMesages";

export class AdminAuthController {
  private _loginUsecase: IAdminLoginUsecase;
  constructor(adminLoginUsecase: IAdminLoginUsecase) {
    this._loginUsecase = adminLoginUsecase;
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      console.log('from admin controller');
      
      const { admin, refreshToken, accessToken } =
        await this._loginUsecase.execute(payload);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res
        .status(statusCodes.OK)
        .json({ success: true, message: authMessages.success.LOGIN_SUCCESS ,data:{admin,accessToken}});
    } catch (error) {
      next(error);
    }
  };
}
