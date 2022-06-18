import 'express-async-errors'
import env from 'dotenv'

env.config()

// packages
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'

// express
import express from 'express'
const app = express()

// database
import connect from './database/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'

// middlewares
import notFoundMiddleware from './middlewares/notFound.js'
import errorHandlerMiddleware from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// securities
app.use(cors())
app.use(helmet())
app.use(rateLimit({ windowMs: 60 * 1000, max: 150 }))

app.get('/', (req, res) => res.send('Depression App API'))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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
