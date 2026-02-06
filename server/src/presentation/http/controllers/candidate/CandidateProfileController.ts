import { Request, Response, NextFunction } from "express";
import { IProfileEditUsecase } from "../../../../applications/interfaces/candidate/IProfileEditUsecase";
import { CandidateProfileUpdateDto } from "../../../../applications/Dtos/candidateDto";
import { AppError } from "../../../../domain/errors/AppError";
import { authMessages } from "../../../../shared/constants/messages/authMesages";
import { statusCodes } from "../../../../shared/enums/statusCodes";

export class CandidateProfileController {
  private _candidateEditProfileUsecase: IProfileEditUsecase;
  constructor(candidateEditProfileUsecase: IProfileEditUsecase) {
    this._candidateEditProfileUsecase = candidateEditProfileUsecase;
  }
  editProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const payload = req.body;
    if (!user) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED,
      );
    }
    const data: CandidateProfileUpdateDto = { ...user, ...payload };
    console.log("from candidate profile controller,user is ", data);
   const updated= await this._candidateEditProfileUsecase.execute(data);
   console.log('updated user from controller ',updated);
   
  };
}
