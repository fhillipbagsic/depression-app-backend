import 'express-async-errors'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import env from 'dotenv'

env.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// packages
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { CronJob } from 'cron'
import cloudinary from 'cloudinary'

// express
import express from 'express'
const app = express()

// database
import connect from './database/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import trackerRouter from './routes/trackerRoutes.js'
import exportRouter from './routes/exportRoutes.js'

// middlewares
import notFoundMiddleware from './middlewares/notFound.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import { getDay } from './controllers/trackerController.js'
import questions from './utils/questions.js'
import {
    createAdminAccount,
    getPatients,
    getPatientsEmails,
} from './controllers/userController.js'
import sendMail from './utils/sendMail.js'

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// securities
app.use(
    cors({
        origin: true,
        credentials: true,
    })
)
app.use(helmet())
app.use(rateLimit({ windowMs: 60 * 1000, max: 150 }))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/tracker', trackerRouter)
app.use('/api/export', exportRouter)

app.use(express.static(path.resolve(__dirname, './client/build')))

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const job = new CronJob(
    '10 1 8 * * *',
    async () => {
        const questionOfTheDay = questions[await getDay()]

        const patients = await getPatientsEmails()

        if (patients) {
            patients.forEach((email) => {
                sendMail(email, questionOfTheDay)
            })
        }
    },
    null,
    true,
    'Asia/Manila'
)

const PORT = process.env.PORT || 5001

const startServer = async () => {
    try {
        connect(process.env.MONGO_URI)
        app.listen(
            PORT,
            console.log(
                `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
            )
        )
    } catch (err) {
        console.log(err)
    }
}

startServer()
