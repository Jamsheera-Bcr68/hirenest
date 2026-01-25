import express from 'express'
import authRoutes from '../presentation/http/routes/authRoutes'
import { connectDB } from '../infrastructure/database'
import {env} from '../infrastructure/config/env'
import cors from "cors";
import { errorHandler } from '../presentation/http/middleweres/errorHandler';
import cookieParser from 'cookie-parser'

const app=express()
//middleweres
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'http://localhost:5173',credentials:true}))

connectDB()

app.use((req, res, next) => {
  console.log("from server");
  next();
});

app.use('/auth',authRoutes)

app.get('/',(req,res)=>{
    console.log('env',env);
    
    res.send('I am from your new project')
})
app.use(errorHandler)
export default app