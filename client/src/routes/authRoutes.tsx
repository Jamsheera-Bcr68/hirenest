import {Route,Routes} from 'react-router-dom'
import Register from '../presentation/pages/auth/Register.tsx'
import Loginfile  from '../presentation/pages/auth/Login.tsx'
import Home from '../presentation/pages/user/Home.tsx'
import Otp from '../presentation/pages/auth/Otp.tsx'
import AdminLogin from '../presentation/pages/auth/AdminLogin.tsx'


export const AuthRouter=()=>{
    return (
        <Routes>
         <Route path='/register' element={<Register />}/>
         <Route path='/otp' element={<Otp />}/>
         <Route path='/login' element={<Loginfile />}/>
         <Route path='/' element={<Home />}/>
         <Route path='/admin/login' element={<AdminLogin/>}/>
    </Routes>
    )
}