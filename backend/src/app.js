import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from '../routes/user.route.js'

const app = express()

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 204,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cookieParser())

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cors(corsOptions))
app.use('/api/v1/users', userRouter)

export { app }