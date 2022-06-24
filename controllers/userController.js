import { StatusCodes } from 'http-status-codes'
import Patient from '../models/Patient.js'
import { BadRequestError } from '../errors/index.js'
import Clinician from '../models/Clinician.js'
import { hashPassword } from '../utils/validatePassword.js'

const createPatient = async (req, res) => {
    const email = req.body.email
    req.body.role = 'Patient'
    req.body.dateAdded = new Date(Date.now())
    req.body.assignedClinician = req.user.email

    const patient = await Patient.findOne({ email })

    if (patient) {
        throw new BadRequestError('Patient is already registered')
    }

    const response = await Patient.create(req.body)

    res.status(StatusCodes.CREATED).json({
        message: `Patient ${response.firstName} ${response.lastName} has been added`,
    })
}

const updatePatient = async (req, res) => {
    const currentEmail = req.body.currentEmail
    const hashedPassword = await hashPassword(req.body.password)

    const response = await Patient.updateOne(
        { email: currentEmail },
        { ...req.body, password: hashedPassword }
    )

    res.status(StatusCodes.OK).json({ message: `Patient has been updated` })
}

const deletePatient = async (req, res) => {
    const email = req.body.email

    if (!email) {
        throw new BadRequestError("Please provide patient's email")
    }
    const response = await Patient.deleteOne({ email })

    res.status(StatusCodes.OK).json({
        message: `Deleted ${response.deletedCount} patient`,
    })
}

const getPatient = async (req, res) => {
    const email = req.body.email

    const patient = await Patient.findOne({ email })

    res.status(StatusCodes.OK).json({ patient })
}

const getPatients = async (req, res) => {
    const clinician = req.body?.email || req.user.email

    const patients = await Patient.find({ assignedClinician: clinician })

    res.status(StatusCodes.OK).json({ patients })
}

const createClinician = async (req, res) => {
    const email = req.body.email

    const clinician = await Clinician.findOne({ email })

    if (clinician) {
        throw new BadRequestError('Clinician is already registered')
    }

    Clinician.create(req.body)

    res.status(StatusCodes.OK).json({ message: 'Clinician registered' })
}

const updateClinician = async (req, res) => {
    const currentEmail = req.body.currentEmail
    const newEmail = req.body.email
    const hashedPassword = await hashPassword(req.body.password)

    // if email has changed, update first all patient who has the assigned clinician
    if (currentEmail !== newEmail) {
        const response = await Patient.updateMany(
            { assignedClinician: currentEmail },
            { assignedClinician: newEmail }
        )
    }

    const response = await Clinician.updateOne(
        { email: currentEmail },
        { ...req.body, password: hashedPassword }
    )

    res.status(StatusCodes.OK).json({ mesage: `Clinician has been updated` })
}

const getClinician = async (req, res) => {
    const email = req.body.email

    const clinician = await Clinician.findOne({ email })

    res.status(StatusCodes.OK).json({ clinician })
}

const getClinicians = async (req, res) => {
    const clinicians = await Clinician.find()

    res.status(StatusCodes.OK).json({ clinicians })
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
}
