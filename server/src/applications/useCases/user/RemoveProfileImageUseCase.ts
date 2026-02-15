import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IRemoveProfileImageUseCase } from '../../interfaces/user/IRemoveProfileImage';
import { IImageStorageService } from '../../interfaces/services/IImageStorage';

export class RemoveProfileImageUseCase implements IRemoveProfileImageUseCase {
  private _userRepository: IUserRepository;
  private _imageStorageService: IImageStorageService;
  constructor(
    userRepository: IUserRepository,
    imageStorageService: IImageStorageService
  ) {
    this._userRepository = userRepository;
    this._imageStorageService = imageStorageService;
  }
  async execute(userId: string, role: UserRole): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || !user.role || !user.id)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
      if(!user.imageUrl) throw new AppError(userMessages.error.IMAGE_ALREADY_REMOVED, statusCodes.CONFLICT);
    const fileName=user.imageUrl
  
    user.imageUrl = '';
    const updatad = await this._userRepository.save(user.id, user);
    if (!updatad)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    await this._imageStorageService.removeImage(fileName)
    return updatad;
  }
}
