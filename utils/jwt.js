import jwt from 'jsonwebtoken'
import config from './config.js'

export const createJWT = (user) => {
    const token = jwt.sign(user, config.jwtSecret , {expiresIn: '1h'})
      return token
} 