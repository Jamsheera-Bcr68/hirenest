import axiosInstance from '../../libraries/axios';
//import { type SkillType } from '../../types/dtos/skillTypes';

export const skillService = {
  async removeSkill(skillId: string) {
    const response = await axiosInstance.patch(
      `/candidate/profile/skills/remove/${skillId}`
    );
    return response.data;
  },
};
