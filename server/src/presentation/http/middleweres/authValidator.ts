import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../domain/errors/AppError";
import { authMessages } from "../../../shared/constants/messages/authMesages";
import { statusCodes } from "../../../shared/enums/statusCodes";
import { ITokenService } from "../../../applications/interfaces/services/ITokenService";
import { TokenExpiredError } from "jsonwebtoken";

//import '../../../types/express/index'

export function authValidator(tokenService: ITokenService) {
  console.log("from auth validator ");
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log("from auth validator ", authHeader);

    if (!authHeader)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED,
      );
    const token = authHeader.split(" ")[1];
    console.log("token is ", token);

    if (!token)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED,
      );
    try {
      const user = await tokenService.verifyAccessToken(token);
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(
          new AppError(
            authMessages.error.ACCESSTOKEN_EXPIRED,
            statusCodes.UNAUTHERIZED,
          ),
        )
      } else
        next(
          new AppError(
            authMessages.error.UNAUTHORIZED,
            statusCodes.UNAUTHERIZED,
          ),
        );
    }
  };
}
