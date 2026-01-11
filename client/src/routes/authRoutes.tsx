import {Route,Routes} from 'react-router-dom'
import Register from '../pages/auth/Register.tsx'
import {Login } from '../pages/auth/Login.tsx'


export const AuthRouter=()=>{
    return (
        <Routes>
         <Route path='/register' element={<Register />}/>
         <Route path='/login' element={<Login />}/>
    </Routes>
    )
}