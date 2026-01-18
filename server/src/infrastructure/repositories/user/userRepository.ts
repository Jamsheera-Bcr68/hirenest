import { GenericRepository } from "../genericRepository";
import { User } from "../../../domain/entities/User";
import { IUserDocument, userModel } from "../../database/models/user/userModel";
import { IUserRepository } from "../../../domain/repositoriesInterfaces/IUserRepositories";

export class UserRepository
  extends GenericRepository<User, IUserDocument>
  implements IUserRepository
{
  constructor() {
    super(userModel);
  }
  findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }
  async createUser(user: User): Promise<User> {
    const document = await this._model.create({
      email: user.email,
      password: user.password,
      phone: user.phone,
    });
    console.log("from userRepository and user is ", document);

    return this.mapToEntity(document);
  }
  async verifyUser(email: string): Promise<void> {
    const user = await this._model.findOne({ email });
    if (!user) throw new Error("user not found");
    user.isVerified = true;
    await user.save();
  }
}
