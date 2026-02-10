import { Request, Response, NextFunction } from 'express';
import { profileDataSchema } from '../validators/profileValidation';

export const profileValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    profileDataSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
