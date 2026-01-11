import dotenv from 'dotenv'

dotenv.config()

export const env={
    Port:Number(process.env.PORT)||7000,
    MONGO_URL:String('mongodb+srv://1234jasihussain_db_user:DANJrxCMDMkhoRFe@hirenest-cluster.c6ahcv8.mongodb.net/hirenest?appName=hirenest-cluster')
}
