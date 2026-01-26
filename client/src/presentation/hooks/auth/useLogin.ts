import { useState } from "react";
import { loginSchema } from "../../../libraries/validations/auth/loginValidation";
import axios from "../../../libraries/axios";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "../../../constants/types/user";
import { loginSuccess } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

type Errors = {
  email?: string;
  password?: string;
  server?: string;
};
export const useLogin = (role: UserRole) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("google login success ,login response ", tokenResponse);
      const token = tokenResponse.access_token;
      if (!token) {
        console.log("access token is not found");

        return;
      }
      try {
        let api=role==='user'?'/auth/google':'/auth/admin/google'
        let response = await axios.post(api, { token,role });
        console.log(response);
        const data = response.data.data;
        console.log("data", data);

        dispatch(loginSuccess(data));

        alert(response.data.message);
        const route=role=='user'?'/':'/admin/dashboard'
        navigate(route);
      } catch (error: any) {
        console.log(error);
        alert(error?.response?.data?.message || error.message);
        setErrors({ server: error.response?.data?.message || error.message });
        return;
      }
    },
    onError: () => {
      console.log("google login failed");
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();

  const submitHandle = async (e: any) => {
    e.preventDefault();

    console.log("login formdata ", formData);
    const result = loginSchema.safeParse(formData);
    console.log("result", result);

    if (!result.success) {
      const error = result.error.flatten().fieldErrors;
      const formattedErrors: Errors = {
        email: error.email?.[0],
        password: error.password?.[0],
      };
      setErrors(formattedErrors);
      return;
    }
    setErrors({});
    console.log("frontend validation success");
    // fetching user
    try {
      const api = role === "admin" ? "/auth/admin/login" : "/auth/login";
      const res = await axios.post(api, formData);
      console.log("axios response ", res);
      alert(res.data.message);

      setErrors({});
      const { accessToken, user } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", user);
      dispatch(loginSuccess({ user, accessToken }));
      const url = role == "admin" ? "/admin/dashboard" : "/";
      navigate(url);
    } catch (err: any) {
      console.log("error from backend ", err);

      // console.log('message ',err.response.data.message);
      setFormData({ email: "", password: "" });
      setErrors({ server: err.response?.data?.message || err.message });
      alert(err.response?.data?.message || err.message);
      return;
    }
  };
  const handleForgotPassword = () => {
    console.log("from forgot password");
    navigate(`/forgot-password?role=${role}`);
  };

  return {
    handleChange,
    formData,
    submitHandle,
    errors,
    handleGoogleSignIn,
    handleForgotPassword,
  };
};

// onClick={ onSuccess={(credentialResponse) => {
//     console.log(credentialResponse);
//   }}
//   onError={() => {
//     console.log("Login Failed");
//   }}}
