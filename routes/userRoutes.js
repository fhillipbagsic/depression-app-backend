import express from 'express'
import {
    createClinician,
    createPatient,
    deletePatient,
    getClinician,
    getClinicians,
    getPatient,
    getPatients,
    updateClinician,
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
    .get([authenticateUser, authorizePermission('Clinician')], getPatients) // Add admin authorization

router // Add admin authorization
    .route('/clinician')
    .get([authenticateUser], getClinician)
    .post([authenticateUser], createClinician)
    .patch([authenticateUser], updateClinician)

router.route('/getclinicians').get([authenticateUser], getClinicians) // Add admin authorization

export default router
