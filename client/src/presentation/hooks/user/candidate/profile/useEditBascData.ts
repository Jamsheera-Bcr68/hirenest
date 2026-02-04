import { useState } from "react";

export const useEditBasicData=()=>{
    const [open,setOpen]=useState(false)
    const handleChangePassword=()=>{
        setOpen(true)
        
    }
    return {handleChangePassword,open,setOpen}
}