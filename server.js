import 'express-async-errors'
import env from 'dotenv'

env.config()

// packages
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import schedule from 'node-schedule'
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

// middlewares
import notFoundMiddleware from './middlewares/notFound.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import { getDay } from './controllers/trackerController.js'
import questions from './utils/questions.js'
import { getPatients, getPatientsEmails } from './controllers/userController.js'
import sendMail from './utils/sendMail.js'

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

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
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

app.get('/', (req, res) => res.send('Depression App API'))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/tracker', trackerRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const job = schedule.scheduleJob('* 9 * * *', async () => {
    const questionOfTheDay = questions[await getDay()]

    const patients = await getPatientsEmails()

    if (patients) {
        patients.forEach((email) => {
            sendMail(email, questionOfTheDay)
        })
    }
})

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
