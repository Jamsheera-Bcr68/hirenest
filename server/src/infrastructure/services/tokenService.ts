
import jwt from 'jsonwebtoken'

export const  getToken=(userId:string)=>{
    const jwt_secret=process.env.JWT_SECRET
    if(!jwt_secret) throw new Error('Token is not available')
    return jwt.sign({userId},jwt_secret,{expiresIn:"1d"})
}