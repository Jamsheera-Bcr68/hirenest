import { UserRole } from "../enums/userEnums";

export class User {
  public readonly id?: string;
  public email: string;
  public password: string;
  public phone: string;
  public createdAt: Date;
  public updatedAt: Date;
  public resetToken?:string
  public resetTokenExpiry?:Date;
  public isVerified: boolean;
  public googleId?:string
  public role?:UserRole

  constructor(
    email: string,
    password: string,
    phone: string,
    isVerified: boolean,
    id?: string | undefined,
    resetToken?:string,
    resetTokenExpiry?:Date|undefined,
    googleId?:string,
     role?:UserRole|undefined,
    createdAt = new Date(),
    updatedAt = new Date(),
   
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isVerified = isVerified;
    this.resetToken=resetToken;
    this.resetTokenExpiry=resetTokenExpiry
    this.googleId=googleId
    this.role=role
  }
}
// export interface persistedUser {
//   readonly _id: string;
//   email: string;
//   password: string;
//   phone: string;
//   createdAt: Date;
//   updatedAt: Date;
//   isVerified: Boolean;
// }
