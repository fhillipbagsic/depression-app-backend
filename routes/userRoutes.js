import express from 'express'
import {
    createClinician,
    createPatient,
    deletePatient,
    getPatient,
    getPatients,
    updatePatient,
} from '../controllers/userController.js'
import {
    authenticateUser,
    authorizePermission,
} from '../middlewares/authentication.js'

const router = express.Router()

router
    .route('/patient')
    .get(
        [authenticateUser, authorizePermission('Patient', 'Clinician')],
        getPatient
    )
    .post([authenticateUser, authorizePermission('Clinician')], createPatient)
    .patch(
        [authenticateUser, authorizePermission('Patient', 'Clinician')],
        updatePatient
    )
    .delete([authenticateUser, authorizePermission('Clinician')], deletePatient)

router
    .route('/getpatients')
    .get([authenticateUser, authorizePermission('Clinician')], getPatients)

router.route('/clinician').post(createClinician)

export default router
