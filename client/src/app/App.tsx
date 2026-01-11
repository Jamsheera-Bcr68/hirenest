
import './App.css'
import { Routes, Route } from 'react-router-dom'
import {AuthRouter} from '../routes/authRoutes.tsx'


function App() {
  

  return (
   <Routes>
    <Route path='/*' element={<AuthRouter/>}/>
   </Routes>
  )
}

export default App
