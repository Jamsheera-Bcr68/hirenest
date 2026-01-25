import { User } from "../../domain/entities/User";

export interface loginOutPutDto {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface IloginInput {
  email: string;
  password: string;
}
