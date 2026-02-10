import { useState, useEffect } from 'react';
import { type UserProfileType } from '../../../../../types/dtos/userTypes';
import axiosInstance from '../../../../../libraries/axios';
import { type typeOfToast } from '../../../../../types/toastTypes';
import { useNavigate } from 'react-router-dom';

export const useProfile = (showToast: (toast: typeOfToast) => void) => {
  const [user, setUser] = useState<UserProfileType>();
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      try {
        let response = await axiosInstance.get('/candidate/profile');
        console.log('response ', response);

        let user = response.data?.user;
        console.log('user', user);

        setUser(user);
      } catch (error: any) {
        console.log(error.response);
        showToast({
          msg: error?.response?.data?.message || error.message,
          type: 'error',
        });
        navigate('/');
        return;
      }
    }
    getUser();
  }, []);

  return { user, setUser };
};
