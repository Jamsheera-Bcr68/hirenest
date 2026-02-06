import { IProfileEditUsecase } from "../../interfaces/candidate/IProfileEditUsecase";
import { CandidateProfileUpdateDto } from "../../Dtos/candidateDto";
import { IUserRepository } from "../../../domain/repositoriesInterfaces/IUserRepositories";

import { AppError } from "../../../domain/errors/AppError";
import { authMessages } from "../../../shared/constants/messages/authMesages";
import { statusCodes } from "../../../shared/enums/statusCodes";
import { User } from "../../../domain/entities/User";

export class CandidateProfileEditUsecase implements IProfileEditUsecase {
  private _userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }
  async execute(data: CandidateProfileUpdateDto): Promise<User> {
    console.log("from usecase", data);
    const user = await this._userRepository.findOne({
      id: data.userId,
      email: data.email,
      role: data.role,
    });
    console.log("user from usercase ", user);
    if (!user) {
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND,
      );
    }
    user.name = data.name ?? user.name;
    user.address = data.location ?? user.address;
    user.title = data.title ?? user.title;
    console.log("user before saving ", user);

    const updated = await this._userRepository.save(user);
    if (!updated) {
      throw new AppError(
        authMessages.error.USERID_NOT_FOUND,
        statusCodes.NOTFOUND,
      );
    }
    return updated;
  }
}
