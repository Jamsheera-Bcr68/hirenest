import type { UserProfileType } from '../dtos/userTypes';

export interface BasicDataProps {
  user?: UserProfileType;
  onUserUpdate: (updatedUser: UserProfileType) => void;
}
