import type { UserProfileType } from '../dtos/userTypes';

export interface BasicDataProps {
  user?: UserProfileType;
  onUserUpdate: (updatedUser: UserProfileType) => void;
}
export type ProfileImgViewModalProps={
  open:boolean,
  onClose:()=>void,
   profileImage: string | undefined;
}
