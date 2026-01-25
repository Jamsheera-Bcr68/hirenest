import { Admin } from "../../domain/entities/admin";

export interface AdminLoginOutPutDto {
  admin: Admin;
  accessToken: string;
  refreshToken: string;
}

export interface AdminloginInput {
  email: string;
  password: string;
}