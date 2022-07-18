import { StatusCodes } from 'http-status-codes'
import { UnauthenticatedError, BadRequestError } from '../errors/index.js'
import Admin from '../models/Admin.js'
import Clinician from '../models/Clinician.js'
import Patient from '../models/Patient.js'
import PasswordRecord from '../models/PasswordRecord.js'
import { createPasswordToken, createToken } from '../utils/jwt.js'
import { comparePassword, hashPassword } from '../utils/validatePassword.js'
import sendMailPasswordURL from '../utils/sendMailPasswordURL.js'

const signup = async (req, res) => {
    const { email, password, role } = req.body

    const emailAlreadyExists =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email })) ||
        (await Admin.findOne({ email }))

    if (emailAlreadyExists) {
        throw new BadRequestError('Email already registered')
    }

    const hashedPassword = await hashPassword(password)
    req.body.password = hashedPassword
    const date = new Date(Date.now())
    const adjustedDate = adjustedDate.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
    })
    req.body.dateAdded = new Date(adjustedDate)

    if (role === 'Patient') {
        Patient.create(req.body)
    } else if (role === 'Clinician') {
        Clinician.create(req.body)
    }

    res.status(StatusCodes.CREATED).json({ message: 'User registered' })
}

const login = async (req, res) => {
    const username = String(req.body?.username || '').toLowerCase()
    const password = req.body?.password

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }

    const user =
        (await Patient.findOne({ username })) ||
        (await Clinician.findOne({ username })) ||
        (await Admin.findOne({ username }))

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await comparePassword(password, user.password)

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = createToken(user)

    // attachCookiesToResponse({ res, user: token })
    res.status(StatusCodes.OK).json(token)
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
        (await Clinician.findOne({ email })) ||
        (await Admin.findOne({ email }))

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
    } else if (user.role === 'Admin') {
        const resp = await Admin.updateOne(
            { email },
            { password: hashedPassword }
        )
    }

    res.status(StatusCodes.OK).json({
        message: 'Password updated successfully',
    })
}

const sendChangePasswordUrl = async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new BadRequestError('Please provide email')
    }

    const user =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email })) ||
        (await Admin.findOne({ email }))

    if (!user) {
        throw new UnauthenticatedError('Email is not registered')
    }

    const token = createPasswordToken(user)

    const resp = await PasswordRecord.updateOne(
        { email },
        { canChangePassword: true },
        { upsert: true }
    )

    const url = `https://www.emovault.com/Newpassword?token=${token.token}`

    sendMailPasswordURL(email, url)

    res.status(StatusCodes.OK).json({
        message: 'Password reset link sent to email',
    })
}

const changeNewPassword = async (req, res) => {
    const { email, role } = req.user
    const newPassword = req.body?.newPassword

    const userPasswordRecord = await PasswordRecord.findOne({ email })

    if (!userPasswordRecord.canChangePassword) {
        throw new BadRequestError('Link is now invalid')
    }

    if (!newPassword) {
        throw new BadRequestError('Please provide new password')
    }

    const hashedPassword = await hashPassword(newPassword)

    if (role === 'Patient') {
        const resp = await Patient.updateOne(
            { email },
            { password: hashedPassword }
        )
    } else if (role === 'Clinician') {
        const resp = await Clinician.updateOne(
            { email },
            { password: hashedPassword }
        )
    } else if (role === 'Admin') {
        const resp = await Admin.updateOne(
            { email },
            { password: hashedPassword }
        )
    }

    const update = await PasswordRecord.updateOne(
        { email },
        { canChangePassword: false }
    )

    res.status(StatusCodes.OK).json({ message: 'Password has been changed' })
}

const getInfo = async (req, res) => {
    const email = req.user.email
    const user =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email }))

    res.status(200).json({ user })
}

export {
    signup,
    login,
    logout,
    changePassword,
    sendChangePasswordUrl,
    changeNewPassword,
    getInfo,
}
