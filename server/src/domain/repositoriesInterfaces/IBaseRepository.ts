import { User } from "../entities/User";

export interface IBaseRepository<T> {
  // findById(id:string):Promise<T |null>
  findOne(filter: Partial<T>): Promise<T | null>;
}
