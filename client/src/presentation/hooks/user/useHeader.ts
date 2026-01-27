import { useState } from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/authSlice";
import axiosInstance from "../../../libraries/axios";


export  const useHeader=()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const HandleLogout=async(e:React.MouseEvent)=>{
        console.log('form logout function');
        try {
            let response=await axiosInstance.post('/auth/logout',{},{withCredentials:true})
            console.log(response);
            
            alert(response.data.message)
          dispatch(logout())  
          navigate('/login')
        } catch (error:any) {
            console.log(error);
            alert(error.response.data.message||error.message)
        }
        
    }
return{
isMenuOpen,setIsMenuOpen,HandleLogout
}
}