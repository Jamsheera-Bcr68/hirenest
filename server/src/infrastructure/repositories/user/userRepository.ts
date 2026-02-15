import { GenericRepository } from '../genericRepository';
import { User } from '../../../domain/entities/User';
import { IUserDocument, userModel } from '../../database/models/user/userModel';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { Types } from 'mongoose';
import { UserSkillDto } from '../../../applications/Dtos/skillDto';
import { ISkillDocument } from '../../database/models/user/skillModel';

export class UserRepository
  extends GenericRepository<User, IUserDocument>
  implements IUserRepository
{
  constructor() {
    super(userModel);
  }
  async findByEmail(email: string, userId?: string): Promise<User | null> {
    const filter = { email };

    const user = await this.findOne(filter);
    console.log('user from repository ', email);

    if (!user) return null;
    else return user;
  }
  async createUser(user: User): Promise<User> {
    const document = await this._model.create({
      email: user.email,
      password: user.password,
      phone: user.phone,
    });
  //  console.log('from userRepository and user is ', document);

    return this.mapToEntity(document);
  }
  async findById(id: string): Promise<User | null> {
    console.log('from userrepository');
    
    const user = await this._model.findById(id).populate('skills');
    console.log('user populated', user);

    if (!user) return null;
    return this.mapToEntity(user);
  }
  mapToEntity = (doc: IUserDocument): User => {
    console.log('doc from maptoentity ', doc);
    const skills = (doc.skills as ISkillDocument[]).map(
      (skill: ISkillDocument): UserSkillDto => {
        return {
          id: skill._id.toString(),
          skillName: skill.skillName,
        };
      }
    );
    console.log('skills frommapToEntity',skills);
    
    return new User(
      doc.email,
      doc.password,
      doc.phone,
      doc.isVerified,
      doc._id.toString(),
      doc.resetToken,
      doc.resetTokenExpiry ?? undefined,
      doc.googleId ?? undefined,
      doc.role ?? undefined,
      doc.name ?? undefined,
      doc.title ?? undefined,
      doc.address ?? undefined,
      doc.socialMediaLinks ?? {},
      doc.imageUrl ?? undefined,
      doc.about ?? '',
      skills
    );
  };

  mapToPersistance = (entity: User) => {
    return {
      name: entity.name,
      title: entity.title,
      address: entity.address,
      socialMediaLinks: entity.socialMediaLinks,
      about: entity.about,
      skills: entity.skills?.map((skill) => new Types.ObjectId(skill.id)),
    };
  };
  async verifyUser(email: string): Promise<void> {
    const user = await this._model.findOne({ email });
    if (!user) throw new Error('user not found');
    user.isVerified = true;
    await user.save();
  }
  async updateResetToken(
    userId: string,
    hashedToken: string,
    resetTokenExpiry: Date
  ): Promise<void> {
    await this._model.updateOne(
      { _id: new Types.ObjectId(userId) },
      { resetToken: hashedToken, resetTokenExpiry }
    );
    
  }
  async updatePassword(email: string, password: string): Promise<void> {
    await this._model.findOneAndUpdate(
      { email },
      { $set: { password, resetToken: null, resetTokenExpiry: null } }
    );
  }

  async updateGoogleId(email: string, googleId: string): Promise<User | null> {
    const document = await this._model.findOneAndUpdate(
      { email },
      { googleId }
    );
    if (!document) return null;
    return this.mapToEntity(document);
  }
  async addSkill(id: string, skillId: string): Promise<User|null> {
    const updated=await this._model.findByIdAndUpdate(id,{$addToSet:{skills:skillId}},{new:true}).populate('skills')
    if(!updated)return null
    return this.mapToEntity(updated)
  }
  async removeSkill(userId: string, skillId: string): Promise<User | null> {
    const updated=await this._model.findByIdAndUpdate(userId,{$pull:{skills:new Types.ObjectId(skillId)}},{new:true}).populate('skills')
    console.log('updated after removeskill from repo',updated);
    if(!updated)return null
    return this.mapToEntity(updated)
    
  }
}
