import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../domain/errors/AppError";
import { authMessages } from "../../../shared/constants/messages/authMesages";
import { statusCodes } from "../../../shared/enums/statusCodes";
import { ITokenService } from "../../../applications/interfaces/services/ITokenService";
//import '../../../types/express/index'



export function authValidator(tokenService: ITokenService) {
      console.log('from auth validator ');
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log('from auth validator ',authHeader);
    
    if (!authHeader)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED,
      );
    const token = authHeader.split(" ")[1];
    if (!token)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED,
      );
    try {
      const user = tokenService.verifyRefreshToken(token);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}
