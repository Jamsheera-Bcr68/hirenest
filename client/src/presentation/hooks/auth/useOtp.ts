import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../libraries/axios";

export function useOtp() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otprefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<string>("");
 // const [msg,setMsg]=useState('')
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    if (!/^\d?$/.test(value)) return;
    console.log("otprefs", otprefs);

    const index: number = Number(e.currentTarget.dataset.index);
    console.log(`type of index ${typeof index}`);

    console.log("key,value", index, value);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    console.log(
      `from handle change otp ${newOtp} length is ${otprefs.current.length}`,
    );
    if (value && index < 5) {
      otprefs.current[index + 1]?.focus();
      console.log("curesor is now in ", index + 1, "tthe positoin ");
    }
  }
  function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>):void{
    console.log('from handle key doun');
    
    const index=Number(e.currentTarget.dataset.index)
if(e.key==='Backspace'){
    console.log('key is back space');
 if( otp[index]){
  const newOtp=[...otp]
  newOtp[index]=''
  setOtp(newOtp)
 }else if(index>0){
  otprefs.current[index-1]?.focus()
 }
}
  }
 async function submitOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (!finalOtp) {
      setError("Please enter your OTP");
      return;
    } else if (finalOtp.length < 6) {
      setError("Please enter your OTP currectly");
      console.log('"Please enter your OTP currectly"');

      return;
    }
    setError("");
    console.log("otp submitted ", finalOtp);
    const email = sessionStorage.getItem("otp_email");
    if (!email) {
      navigate("/register");
      return null;
    }
    try {
      let response =await axios.post("/auth/otp", { otp: finalOtp, email });
      console.log("response from the server", response);
      alert(response.data.message)
      navigate('/')
    } catch (error:any) {
      console.log(error);
      setError(error.response.data.message)
      alert(error.response.data.message)
    }
  }
  return {
    otp,
    handleChange,
    otprefs,
    error,
    submitOtp,
    handleKeyDown
  };
}
