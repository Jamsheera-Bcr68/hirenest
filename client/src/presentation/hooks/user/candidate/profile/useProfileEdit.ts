import { useState } from 'react';
import { profileDataSchema } from '../../../../../libraries/validations/auth/candidate/profileValidation';
import axiosInstance from '../../../../../libraries/axios';
import type { typeOfToast } from '../../../../../shared/toast/useToast';

type FormData = {
  name?: string;
  title?: string;
  place?: string;
  state?: string;
  country?: string;
};

export const useProfileEdit = (showToast: (toast: typeOfToast) => void) => {
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<FormData>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('from handle change');

    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('from handle submit ', formData);
    const result = profileDataSchema.safeParse(formData);
    if (!result.success) {
      const error = result.error.flatten().fieldErrors;
      console.log('zode error', error);

      const formattedError: FormData = {
        name: error?.name?.[0],
        title: error.title?.[0],
        place: error.place?.[0],
        state: error.state?.[0],
        country: error.country?.[0],
      };

      setError(formattedError);

      return;
    }

    //  console.log('result .data is ');

    if (Object.entries(result.data).every((arr) => arr[1] == undefined)) {
      showToast({ msg: 'Nothing to Update', type: 'error' });
      return;
    }

    setError({});
    try {
      const response = await axiosInstance.post('/candidate/profile', formData);
      console.log('response from backend ', response);
      showToast({ msg: response.data.message, type: 'success' });
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error?.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return {
    formData,
    handleChange,
    handleSubmit,
    error,
  };
};
