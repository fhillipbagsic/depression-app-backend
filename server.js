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


// routers

// middlewares

app.use(express.json())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(helmet())
app.use(rateLimit({windowMs: 60 * 1000, max: 150}))

app.get('/', (req, res) => res.send('Depression App API'))

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
