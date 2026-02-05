
import { useSelector } from "react-redux"
import { Navigate,Outlet } from "react-router-dom"

export default function ProtectedRoutes(){
const {user,isAuthenticated}=useSelector((state:any)=>state.auth)
console.log('isAuthenticated',isAuthenticated)
if(!user||!isAuthenticated)
return  <Navigate to='/login' replace />
return   (<Outlet/>)
}