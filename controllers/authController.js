import { StatusCodes } from 'http-status-codes'
import { UnauthenticatedError, BadRequestError } from '../errors/index.js'
import Clinician from '../models/Clinician.js'
import Patient from '../models/Patient.js'
import { attachCookiesToResponse, createToken } from '../utils/jwt.js'
import { comparePassword, hashPassword } from '../utils/validatePassword.js'

const signup = async (req, res) => {
    const { email, password, role } = req.body

    const emailAlreadyExists =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email }))

    if (emailAlreadyExists) {
        throw new BadRequestError('Email already exists')
    }

    const hashedPassword = await hashPassword(password)
    req.body.password = hashedPassword

    if (role === 'Patient') {
        Patient.create(req.body)
    } else if (role === 'Clinician') {
        Clinician.create(req.body)
    }

    res.status(StatusCodes.CREATED).json({ message: 'User registered' })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email }))

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await comparePassword(password, user.password)

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = createToken(user)

    attachCookiesToResponse({ res, user: token })

    res.status(StatusCodes.OK).json({ user: token })
}

export { signup, login }
