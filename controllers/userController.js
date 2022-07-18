import { StatusCodes } from 'http-status-codes'
import Patient from '../models/Patient.js'
import { BadRequestError } from '../errors/index.js'
import Clinician from '../models/Clinician.js'
import { hashPassword } from '../utils/validatePassword.js'
import Admin from '../models/Admin.js'
import sendMailUserAccount from '../utils/sendMailUserAccount.js'

const createPatient = async (req, res) => {
    const { email, firstName, lastName, username, password } = req.body

    req.body.role = 'Patient'
    const date = new Date(Date.now())
    const adjustedDate = date.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
    })
    req.body.dateAdded = new Date(adjustedDate)
    req.body.assignedClinician = req.user.email

    const patientEmail =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email })) ||
        (await Admin.findOne({ email }))
    const patientUsername =
        (await Patient.findOne({ username })) ||
        (await Clinician.findOne({ username })) ||
        (await Admin.findOne({ username }))

    if (patientEmail) {
        throw new BadRequestError('Email already registered')
    }

    if (patientUsername) {
        throw new BadRequestError('Username is already registered')
    }

    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword
    req.body.username = String(req.body.username).toLowerCase()
    const response = await Patient.create(req.body)

    sendMailUserAccount(email, firstName, lastName, username, password)

    res.status(StatusCodes.CREATED).json({
        message: `Patient ${response.firstName} ${response.lastName} has been added`,
    })
}

const updatePatient = async (req, res) => {
    const { currentEmail, email, username } = req.body
    // if new email is not the same as current email (user will update the email), check if the new email is already used
    if (email !== currentEmail) {
        const isRegistered =
            (await Patient.findOne({ email })) ||
            (await Clinician.findOne({ email })) ||
            (await Admin.findOne({ email }))

        if (isRegistered) {
            throw new BadRequestError('Email is already used')
        }
    }

    const patient = await Patient.findOne({ email: currentEmail })

    // check if username has not changed, if username has changed, check if new username is already used
    if (username !== patient.username) {
        const isRegistered =
            (await Patient.findOne({ username })) ||
            (await Clinician.findOne({ username })) ||
            (await Admin.findOne({ username }))

        if (isRegistered) {
            throw new BadRequestError('Username is already used')
        }
    }

    const hashedPassword = await hashPassword(req.body.password)

    const response = await Patient.updateOne(
        { email: currentEmail },
        { ...req.body, password: hashedPassword }
    )

    res.status(StatusCodes.OK).json({ message: `Patient has been updated` })
}

const deletePatient = async (req, res) => {
    const email = req.query.email

    if (!email) {
        throw new BadRequestError("Please provide patient's email")
    }
    const response = await Patient.deleteOne({ email })

    res.status(StatusCodes.OK).json({
        message: `Deleted ${response.deletedCount} patient`,
    })
}

const getPatient = async (req, res) => {
    const email = req.query.email

    const patient = await Patient.findOne({ email })

    res.status(StatusCodes.OK).json({ patient })
}

const getPatients = async (req, res) => {
    const clinician = req.query?.email || req.user.email

    const patients = await Patient.find({ assignedClinician: clinician })

    res.status(StatusCodes.OK).json({ patients })
}

const createClinician = async (req, res) => {
    const { email, username, password } = req.body

    const clinicianEmail =
        (await Patient.findOne({ email })) ||
        (await Clinician.findOne({ email })) ||
        (await Admin.findOne({ email }))
    const clinicianUsername =
        (await Patient.findOne({ username })) ||
        (await Clinician.findOne({ username })) ||
        (await Admin.findOne({ username }))

    if (clinicianEmail || clinicianUsername) {
        throw new BadRequestError('Email and/or username is already registered')
    }

    const date = new Date(Date.now())
    const adjustedDate = date.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
    })
    req.body.dateAdded = new Date(adjustedDate)
    req.body.role = 'Clinician'
    const hashedPassword = await hashPassword(password)
    req.body.password = hashedPassword
    req.body.username = String(req.body.username).toLowerCase()
    await Clinician.create(req.body)
    sendMailUserAccount(email, username, password)
    res.status(StatusCodes.OK).json({ message: 'Clinician registered' })
}

const updateClinician = async (req, res) => {
    const { currentEmail, email, username } = req.body
    const newEmail = req.body.email
    // if new email is not the same as current email (user will update the email), check if the new email is already used
    if (email !== currentEmail) {
        const isRegistered =
            (await Patient.findOne({ email })) ||
            (await Clinician.findOne({ email })) ||
            (await Admin.findOne({ email }))

        if (isRegistered) {
            throw new BadRequestError('Email is already used')
        }
    }

    const clinician = await Clinician.findOne({ email: currentEmail })
    // check if username has not changed, if username has changed, check if new username is already used
    if (username !== clinician.username) {
        const isRegistered =
            (await Patient.findOne({ username })) ||
            (await Clinician.findOne({ username })) ||
            (await Admin.findOne({ username }))

        if (isRegistered) {
            throw new BadRequestError('Username is already used')
        }
    }

    // if email has changed, update first all patient who has the assigned clinician
    if (currentEmail !== newEmail) {
        const response = await Patient.updateMany(
            { assignedClinician: currentEmail },
            { assignedClinician: newEmail }
        )
    }
    const hashedPassword = await hashPassword(req.body.password)
    const response = await Clinician.updateOne(
        { email: currentEmail },
        { ...req.body, password: hashedPassword }
    )

    res.status(StatusCodes.OK).json({ mesage: `Clinician has been updated` })
}

const getClinician = async (req, res) => {
    const email = req.query?.email || req.user.email

    const clinician = await Clinician.findOne({ email })

    res.status(StatusCodes.OK).json({ clinician })
}

const getClinicians = async (req, res) => {
    const clinicians = await Clinician.find()

    res.status(StatusCodes.OK).json({ clinicians })
}

const getAdmin = async (req, res) => {
    const admin = await Admin.findOne()

    res.status(StatusCodes.OK).json({ admin })
}

const getPatientsEmails = async () => {
    const patients = (await Patient.find()) || []
    return patients.map((patient) => patient.email)
}

const createAdminAccount = async () => {
    const admin = {
        firstName: 'admin',
        lastName: 'admin',
        email: 'emovault@gmail.com',
        contactNo: '09123456789',
        picture:
            'https://res.cloudinary.com/dlvt2lnkh/image/upload/v1656746343/emovaultClient/egj5r6ccwa0my7skdkfc.png',
        username: 'Admin',
        password: 'adminpass',
        role: 'Admin',
    }

    const hashedPassword = hashPassword(admin.password)
    admin.password = await hashedPassword

    const response = await Admin.create(admin)
}
export {
    createPatient,
    updatePatient,
    deletePatient,
    getPatient,
    getPatients,
    createClinician,
    updateClinician,
    getClinician,
    getClinicians,
    getAdmin,
    getPatientsEmails,
    createAdminAccount,
}
