import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../../../domain/errors/AppError";
import { generalMessages } from "../../../shared/constants/messages/generalMessages";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("from error handler");
  console.log(error);
  
  if (error instanceof AppError) {
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
    return;
  }
  const statusCode = 500;
  const message = generalMessages.errors.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ success: false, message: message });
};
