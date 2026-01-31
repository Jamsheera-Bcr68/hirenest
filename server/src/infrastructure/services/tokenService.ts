//import { authMessages } from "../../shared/constants/messages/authMesages";
//import { statusCodes } from "../../shared/enums/statusCodes";
import jwt from "jsonwebtoken";

export const getToken = (userId: string, email: string) => {
  const jwt_secret = process.env.JWT_ACCESS_SECRET;
  if (!jwt_secret) throw new Error("Access Secret  is not available");
  return jwt.sign({ userId, email }, jwt_secret, { expiresIn: "15m" });
};
export const getRefreshToken = (userId: string, email: string) => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  if (!refreshSecret) throw new Error("Refresh Scret is not available");
  return jwt.sign({ userId, email }, refreshSecret, { expiresIn: "7d" });
};
export const verifyRefreshToken = (token: string): {userId:string,email:string} => {
  const refresh_secret = process.env.JWT_REFRESH_SECRET;
  if (!refresh_secret) throw new Error("Refresh Secret  is not available");
  const payload = jwt.verify(token, refresh_secret) as {userId:string,email:string}
  return payload
};
