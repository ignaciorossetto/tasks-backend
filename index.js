import express from 'express'
import config from './utils/config.js'
import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
const app = express()

app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:5173/'],
    credentials: true,
}))
app.use(cookieParser(config.cookieSecret))
app.use(cookieSession({
    secret: config.cookieSecret,
    keys: ['asdasd', 'qweqwe']
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
 

app.use(authRoutes)
app.use(tasksRoutes)

app.use(errorHandler)

app.listen(config.port, ()=> {
    console.log(`Listening on port ${config.port}`)
})