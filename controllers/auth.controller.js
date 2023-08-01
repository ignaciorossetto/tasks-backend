import { customError } from '../middlewares/errorHandler.js'
import {pool} from '../utils/db.js'
import { hashPass, isValidPass } from '../utils/hashPass.js'
import { createJWT } from '../utils/jwt.js'

export const authLogin = async(req,res,next) => {
    const {email} = req.body
    const userQuery = 'SELECT * FROM users WHERE email=(?)'
    try {
        const data = await pool.query(userQuery, [email])
        const user = data[0][0]
        if(!user){
            throw customError('Email not found...', 404)
        }
        if(!isValidPass(req.body.password, user.password,)){
            throw customError('Wrong password...', 401)
        }
        const {password, ...other } = user
        const token = createJWT(user)
        const expireTime = 24 * 60 * 60 * 1000;
        return res.cookie('tasksToken', token, {
            signed: true,
            sameSite: 'None',
            secure: true,
            expireTime: expireTime
        }).json({
            status: 'success',
            payload: other
        })
    } catch (error) {
        console.log('error', error)
        next(error)
    }
}


export const authSignUp = async(req,res,next) => {
    const {email, password} = req.body
    const query = 'INSERT INTO users(email, password) VALUES (?, ?)'
    const userQuery = 'SELECT * FROM users WHERE email=(?)'
    try {
        const user = await pool.query(userQuery, [email])
        if(user){
            throw customError('Email already registered...', 409)
        }
        const hasedPassword = hashPass(password)
        const response = await pool.query(query, [email, hasedPassword])
        res.json({
            status: 'success',
            message: 'Task created!'
        })
    } catch (error) {
        next(error)
    }
}