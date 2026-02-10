import { Request, Response, NextFunction } from 'express';
import { IProfileEditUsecase } from '../../../../applications/interfaces/candidate/IProfileEditUsecase';
import { CandidateProfileUpdateDto } from '../../../../applications/Dtos/candidateDto';
import { AppError } from '../../../../domain/errors/AppError';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import type { UpdataUserProfileInput } from '../../validators/profileValidation';
import { userMessages } from '../../../../shared/constants/messages/userMessages';
import { IGetUserUseCase } from '../../../../applications/interfaces/user/IGetUserDataUsecase';
import { UserMapper } from '../../../../applications/mappers/userMapper';

export class CandidateProfileController {
  private _candidateEditProfileUsecase: IProfileEditUsecase;
  private _getUserUseCase: IGetUserUseCase;
  constructor(
    candidateEditProfileUsecase: IProfileEditUsecase,
    getUserUseCase: IGetUserUseCase
  ) {
    this._candidateEditProfileUsecase = candidateEditProfileUsecase;
    this._getUserUseCase = getUserUseCase;
  }
  editProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log('from edit profile req.user ', user);

    const payload: UpdataUserProfileInput = req.body;
    console.log('payload from controller ', payload);

    if (!user) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

    const data: CandidateProfileUpdateDto = { ...user };
    data.location = {
      country: payload.country ?? undefined,
      state: payload.state ?? undefined,
      place: payload.place ?? undefined,
    };
    data.name = payload.name ?? undefined;
    data.title = payload.title ?? undefined;
    data.socialMedidaLinks = payload.socialMediaLinks ?? undefined;
    console.log('from candidate profile controller,data is ', data);
    try {
      const updated = await this._candidateEditProfileUsecase.execute(data);
      console.log('updated user from controller ', updated);
      const userProfile = UserMapper.toUserProfileDto(updated);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.PROFILE_UPDATED,
        user: userProfile,
      });
    } catch (error) {
      next(error);
    }
  };
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from get user');
    const userData = req.user;
    console.log('user from token ', userData);
    try {
      if (!userData || !userData.userId || !userData.role) {
        throw new AppError(
          userMessages.error.NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }
      const user = await this._getUserUseCase.execute(
        userData.userId,
        userData.role
      );
      const userProfile = UserMapper.toUserProfileDto(user);

      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.USER_FETCHED,
        user: userProfile,
      });
    } catch (error) {
      next(error);
    }
  };
}
