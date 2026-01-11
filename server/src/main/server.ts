import express from 'express'
import authRoutes from '../presentation/http/routes/authRoutes'


import {env} from '../infrastructure/config/env'
import { connectDB } from '../infrastructure/database'
import cors from "cors";
const app=express()
app.use(express.json())
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
app.listen(env.Port,()=>{
    console.log('server is listening');
    
})