import { UserRole } from "../../domain/enums/userEnums";

export type AddressType = {
  place?: string;
  state?: string;
  country?: string;
};
export interface CandidateProfileUpdateDto {
  email: string;
  userId: string;
  role: UserRole;
  name?: string;
  title?: string;
  location?: AddressType;
}
