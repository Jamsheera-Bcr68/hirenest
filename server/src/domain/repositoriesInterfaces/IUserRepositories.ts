import { User } from '../entities/User';
import { IExperience } from '../values/profileTypes';
import { IBaseRepository } from './IBaseRepository';
export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string, userId?: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  verifyUser(email: string): Promise<void>;
  updateResetToken(
    userId: string,
    hashedToken: string,
    resetTokenExpiry: Date
  ): Promise<void>;
  updatePassword(email: string, password: string): Promise<void>;

  updateGoogleId(email: string, googleId: string): Promise<User | null>;
  addSkill(id: string, skillId: string): Promise<User | null>;
  removeSkill(userId: string, skillId: string): Promise<User | null>;
  addExperience(userId: string, experienceId: string): Promise<User | null>;
  removeExperience(userId: string, expId: string): Promise<User | null>;
  addEducation(userId: string, eduId: string): Promise<User | null>;
  removeEducation(userId: string, eduId: string): Promise<User | null>;
}
