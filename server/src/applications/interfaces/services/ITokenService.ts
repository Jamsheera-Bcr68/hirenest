export type TokenPayload = {
  userId: string;
  email: string;
};

export interface ITokenService {
  generateAccessToken(userId: string, email: string): string;
  generateRefreshToken(userId: string, email: string): string;
  verifyRefreshToken(token: string): TokenPayload;
  verifyAccessToken(token:string):TokenPayload
}
