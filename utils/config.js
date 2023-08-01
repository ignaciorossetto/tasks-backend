import dotenv from 'dotenv'
dotenv.config()

export default{
    port: process.env.PORT,
    cookieSecret: process.env.COOKIE_SECRET,
    jwtSecret: process.env.JWT_SECRET
}