import { UserRole } from "../../domain/enums/userEnums";

export interface userDto {
  id: string;
  email: string;
  imageUrl:string,
  role:UserRole,
  phone:string,
  isBlocked: boolean;
}
