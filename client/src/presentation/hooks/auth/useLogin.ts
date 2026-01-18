import { useState } from "react";
import { loginSchema } from "../../../libraries/validations/user/loginValidation";
import axios from "../../../libraries/axios";
import { useNavigate } from "react-router-dom";

type Errors = {
  email?: string;
  password?: string;
  server?: string;
};
export const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: any) => {
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
      const res = await axios.post("/auth/login", formData);
      console.log("axios response ", res);
      navigate("/");
      setErrors({});
    } catch (err: any) {
      console.log("error from backend ", err);

      // console.log('message ',err.response.data.message);
      setErrors({ server: err.response?.data?.message || err.message });
      return;
    }
  };
  return {
    handleChange,
    formData,
    submitHandle,
    errors,
  };
};
