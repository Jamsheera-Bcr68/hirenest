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
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ email });
    if(!user)return null
   else  return user
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
   mapToEntity = (doc: IUserDocument): User => {
    return new User(
      doc.email,
      doc.password,
      doc.phone,
      doc.isVerified,

      doc._id.toString(),
    );
  };
  async verifyUser(email: string): Promise<void> {
    const user = await this._model.findOne({ email });
    if (!user) throw new Error("user not found");
    user.isVerified = true;
    await user.save();
  }
}
