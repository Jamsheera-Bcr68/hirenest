
import { useSelector } from "react-redux"
import { Navigate,Outlet } from "react-router-dom"

export default function ProtectedRoutes(){
const isAuthenticated=useSelector((state:any)=>state.auth.isAuthenticated)
console.log('isAuthenticated',isAuthenticated)
return isAuthenticated?  (<Outlet/>):<Navigate to='/login' replace />

}