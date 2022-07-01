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
        throw new BadRequestError('Email already registered')
    }

    const hashedPassword = await hashPassword(password)
    req.body.password = hashedPassword
    req.body.dateAdded = new Date(Date.now())

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

    console.log(user)
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await comparePassword(password, user.password)

    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = createToken(user)

    attachCookiesToResponse({ res, user: token })

    res.status(StatusCodes.OK).json({ user: token })
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    })

    res.status(StatusCodes.OK).json({ message: 'User logged out' })
}

const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body

    if (!email || !oldPassword || !newPassword) {
        throw new BadRequestError(
            `Please provide email, old password, and new password`
        )
    }
    const user =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email }))

    const isPasswordCorrect = await comparePassword(oldPassword, user.password)

    if (!isPasswordCorrect) {
        throw new BadRequestError('Old Password incorrect')
    }

    const hashedPassword = await hashPassword(newPassword)

    if (user.role === 'Patient') {
        const resp = await Patient.updateOne(
            { email },
            { password: hashedPassword }
        )
    } else if (user.role === 'Clinician') {
        const resp = await Clinician.updateOne(
            { email },
            { password: hashedPassword }
        )
    }

    res.status(StatusCodes.OK).json({
        message: 'Password updated successfully',
    })
}

const getInfo = async (req, res) => {
    const email = req.user.email
    const user =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email }))

    res.status(200).json({ user })
}

export { signup, login, logout, changePassword, getInfo }
