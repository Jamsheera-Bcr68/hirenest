import {email, z} from 'zod'

export const loginSchema=z.object({
    email:z.string().min(1,'Email is required')
    .trim()
    .email('Invalid email'),
    password:z.string() .trim().min(6,'Password Should be atleast 6')
    .max(10,'Password should be atmost 10 charectors')
   
})