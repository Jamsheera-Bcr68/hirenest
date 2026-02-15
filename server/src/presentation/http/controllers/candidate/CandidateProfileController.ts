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
import { IEditProfileImageUsecase } from '../../../../applications/interfaces/user/IEditProfileImageUsecase';
import { UploadFileDto } from '../../../../applications/Dtos/uploadFileDto';
import { IRemoveProfileImageUseCase } from '../../../../applications/interfaces/user/IRemoveProfileImage';
import { IAddSkillToProfileUseCase } from '../../../../applications/interfaces/candidate/IAddSkilltoProfileUseCase';
import { IEditAboutUseCase } from '../../../../applications/interfaces/candidate/IEditAboutUseCase';
import { IRemoveSkillFromProfileUseCase } from '../../../../applications/interfaces/candidate/IRemoveSkillUseCase';
import { success } from 'zod';

export class CandidateProfileController {
  private _candidateEditProfileUsecase: IProfileEditUsecase;
  private _getUserUseCase: IGetUserUseCase;
  private _editProfileImageUseCase: IEditProfileImageUsecase;
  private _removeProfileImageUseCase: IRemoveProfileImageUseCase;
  private _editAboutUseCase: IEditAboutUseCase;
  private _addSkillToProfileUseCase: IAddSkillToProfileUseCase;
  private _removeSkillUseCase: IRemoveSkillFromProfileUseCase;
  constructor(
    candidateEditProfileUsecase: IProfileEditUsecase,
    getUserUseCase: IGetUserUseCase,
    editProfileImageUseCase: IEditProfileImageUsecase,
    removeProfileImageUseCase: IRemoveProfileImageUseCase,
    editAboutUseCase: IEditAboutUseCase,
    addSkillToProfileUseCase: IAddSkillToProfileUseCase,
    removeSkillUseCase: IRemoveSkillFromProfileUseCase
  ) {
    this._candidateEditProfileUsecase = candidateEditProfileUsecase;
    this._getUserUseCase = getUserUseCase;
    this._editProfileImageUseCase = editProfileImageUseCase;
    this._removeProfileImageUseCase = removeProfileImageUseCase;
    this._editAboutUseCase = editAboutUseCase;
    this._addSkillToProfileUseCase = addSkillToProfileUseCase;
    this._removeSkillUseCase = removeSkillUseCase;
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
    //console.log('from get user');
    const userData = req.user;
    //console.log('user from token ', userData);
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

  editProfileImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('from edit image');
    const user = req.user;
    if (!user || !user.role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const file = req.file;
    if (!file) {
      throw new AppError(
        userMessages.error.IMAGE_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    }
    //   console.log('file ', file);

    const imageFile: UploadFileDto = {
      buffer: file.buffer,
      mimetype: file.mimetype,
      size: file.size,
      originalName: file.originalname,
    };
    try {
      const updatedUser = await this._editProfileImageUseCase.execute(
        user?.userId,
        user?.role,
        imageFile
      );
      console.log('updted user from controlleer image edit ', updatedUser);
      const userDto = UserMapper.toUserProfileDto(updatedUser);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.USER_PROFILE_IMAGE_UPDATED,
        user: userDto,
      });
    } catch (error) {
      next(error);
    }
  };
  removeProfileImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('from remove image controller');
    const user = req.user;
    if (!user) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }
    try {
      const updatedUser = await this._removeProfileImageUseCase.execute(
        user.userId,
        user.role
      );
      const userDto = UserMapper.toUserProfileDto(updatedUser);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.USER_PROFILE_IMAGE_REMOVED,
        user: userDto,
      });
    } catch (error) {
      next(error);
    }
  };
  addAbout = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from about controller');
    const user = req.user;

    try {
      if (!user || !user.role || !user.userId)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      const { value } = req.body;
      if (!value)
        throw new AppError(
          userMessages.error.NO_ABOUT_VALUE,
          statusCodes.BADREQUEST
        );
      const userUpdated = await this._editAboutUseCase.execute(
        user.userId,
        user.role,
        value
      );
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.USER_PROFILE_ABOUT_UPDATED,
        user: userUpdated,
      });
    } catch (error) {
      next(error);
    }
  };
  addSkill = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      if (!user)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      const { skillName } = req.body;
      if (!skillName) {
        throw new AppError(
          userMessages.error.SKILL_NOT_FOUND,
          statusCodes.BADREQUEST
        );
      }
      const updated = await this._addSkillToProfileUseCase.execute(
        user.userId,
        skillName,
        user.role
      );
      const updatedUser = UserMapper.toUserProfileDto(updated);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.SKILL_ADDED,
        user: updatedUser,
      });
    } catch (error: any) {
      next(error);
    }
  };
  removeSkill = async (req: Request, res: Response, next: NextFunction) => {
 
    const user = req.user;
    const { skillId } = req.params;
       console.log('from remove skll conteoler,dkillid',skillId);
    
    try {
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      if (!skillId) {
        throw new AppError(
          userMessages.error.SKILLID_NOT_FOUND,
          statusCodes.BADREQUEST
        );
      }
      const updatedUser =await this._removeSkillUseCase.execute(
        user.userId,
        skillId,
        user.role
      );
      return res.status(statusCodes.OK).json({success:true,message:userMessages.success.SKILL_REMOVED,user:UserMapper.toUserProfileDto(updatedUser)})
    } catch (error) {
      next(error);
    }
  };
}
