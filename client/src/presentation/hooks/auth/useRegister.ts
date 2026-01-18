import { useState } from "react";
import { registerSchema } from "../../../libraries/validations/user/registerValidations";
import axios from "../../../libraries/axios";
import { useNavigate } from "react-router-dom";

type FormErrors = {
  email?: string;
  password?: string;
  phone?: string;
  confirm_password?: string;
  server?: string;
};
type FormData = {
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
};

export const useRegister = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [succesMsg, setMsg] = useState<string>("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandle = async (e: any) => {
    e.preventDefault();
    console.log("formData", formData);
    const result = registerSchema.safeParse(formData);
    console.log("result", result);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      console.log("fieldErrors", fieldErrors);

      const formattedErrors: FormErrors = {
        email: fieldErrors?.email?.[0],
        password: fieldErrors.password?.[0],
        confirm_password: fieldErrors.confirm_password?.[0],
        phone: fieldErrors.phone?.[0],
      };
      setErrors(formattedErrors);
      return;
    }
    setErrors({});
    console.log("validation successful");

    try {
      const response = await axios.post("/auth/register", formData);
      console.log("response", response);
      setMsg(response.data.message);
      alert(response.data.message);
      sessionStorage.setItem("otp_email", formData.email);
      navigate("/otp");
    } catch (error: any) {
      console.log("error response", error.response);
      setErrors({
        server: error.response.data.message || "Something went wrong",
      });
      alert(error.response.data.message || "Something went wrong");
      return;
    }
  };
  return {
    formData,
    succesMsg,
    errors,
    handleChange,
    submitHandle,
  };
};
