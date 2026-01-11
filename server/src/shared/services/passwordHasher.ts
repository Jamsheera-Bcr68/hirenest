import bcrypt from 'bcryptjs'

export const hashedPassword=async (plain:string):Promise<string>=>{
    const saltRounds=10
    return bcrypt.hash(plain,saltRounds)
}