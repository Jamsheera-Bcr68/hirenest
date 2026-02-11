import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { UploadFileDto } from '../../Dtos/uploadFileDto';
import { IEditProfileImageUsecase } from '../../interfaces/user/IEditProfileImageUsecase';
import { IImageStorageService } from '../../interfaces/services/IImageStorage';

export class EditProfileImageUseCase implements IEditProfileImageUsecase {
  private _userRepository: IUserRepository;
  private _imageStorageService:IImageStorageService
  constructor(userRepository: IUserRepository,imageStorageService:IImageStorageService) {
    this._userRepository = userRepository;
    this._imageStorageService=imageStorageService
  }
  async execute(userId: string, role: UserRole,file:UploadFileDto): Promise<User> {
    const user = await this._userRepository.findById(userId);
    if (!user || user.role !== role) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    user.imageUrl=await this._imageStorageService.uploadImage(file)
    const updated=await this._userRepository.save(user)
    if(!updated){
        throw new AppError(userMessages.error.NOT_FOUND,statusCodes.NOTFOUND)
    }
    return updated
  }
}
