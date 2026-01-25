import { useState } from "react";
import { forgotPasswordSchema } from "../../../libraries/validations/auth/forgotPasswordValidation";
import axiosInstance from "../../../libraries/axios";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("from handle change from password forgot page");
    setEmail(e.target.value);
  };
  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("forgot form submitted");
    console.log("email is ", email);
    
    const result = forgotPasswordSchema.safeParse({ email });
    console.log("result", result);

    if (!result.success) {
      const error = result.error.flatten().fieldErrors;

      console.log("forrmatted errors ", { error });
      setError(error.email?.[0] as string);
      setEmail("");
      return;
    }
    console.log("front end validation successfule");

    setError("");
    localStorage.setItem("reset_email",email)
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: email,
      });
      console.log("response from the backend", response);
      alert(response.data.message)
    } catch (error: any) {
      setError(error.response.message || error.message);
    }
  };
  return { handleChange, email, submitHandle, error };
};
