import { User } from "../entities/User";
import { IBaseRepository } from "./IBaseRepository";
export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string, userId?: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  verifyUser(email: string): Promise<void>;
  updateResetToken(
    userId: string,
    hashedToken: string,
    resetTokenExpiry: Date,
  ): Promise<void>;
  updatePassword(email: string, password: string): Promise<void>;
 
  updateGoogleId(email: string, googleId: string): Promise<User | null>;
}
