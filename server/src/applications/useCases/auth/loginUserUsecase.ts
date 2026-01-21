import { IloginInput,loginOutPutDto } from "../../Dtos/loginDto";
import { IUserLoginUseCase } from "../../interfaces/auth/IUserLoginUseCase";
import { IUserRepository } from "../../../domain/repositoriesInterfaces/IUserRepositories";
import {  User } from "../../../domain/entities/User";
import { AppError } from "../../../domain/errors/AppError";
import { comparePassword } from "../../../infrastructure/services/passwordHasher";
import { statusCodes } from "../../../shared/enums/statusCodes";
import { authMessages } from "../../../shared/constants/messages/authMesages";
import { ITokenService } from "../../interfaces/services/ITokenService";


export class LoginUseCase implements IUserLoginUseCase {
  private _userRepository: IUserRepository;
  private _tokenService: ITokenService;
  constructor(userRepository: IUserRepository, tokenService: ITokenService) {
    this._userRepository = userRepository;
    this._tokenService = tokenService;
  }
  async execute(input: IloginInput): Promise<loginOutPutDto | null> {
    const user: User | null = await this._userRepository.findByEmail(
      input.email,
    );
    if (!user) throw new AppError("user not found ", 401);
    if (!comparePassword(input.password, user.password))
      throw new AppError(
        authMessages.error.BAD_REQUEST,
        statusCodes.UNAUTHERIZED,
      );
    if (!user.id) throw new AppError("user id is not found ", 401);
    const token = this._tokenService.generateAccessToken(user.id?.toString());
    
    console.log("from login use case token is ", token);

    return {user,accessToken:token};
  }
}
