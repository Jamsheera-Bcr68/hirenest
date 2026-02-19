import axiosInstance from '../../libraries/axios';
import { type AddExperienceFormData } from '../../libraries/validations/auth/candidate/experienceFormValidation';

export const profileService = {
  async addExperience(formData: AddExperienceFormData) {
    const response = await axiosInstance.patch(
      '/candidate/profile/experience/add',
      formData
    );
    return response.data;
  },
  async editExperience(formData: AddExperienceFormData, expId: string) {
    const response = await axiosInstance.patch(
      `/candidate/profile/experience/edit/${expId}`,
      formData
    );
    return response.data;
  },
  async removeExperience(expId: string) {
    const res = await axiosInstance.patch(
      `/candidate/profile/experience/remove/${expId}`
    );
    return res.data;
  },
};
