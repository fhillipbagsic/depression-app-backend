import express from 'express'
import {
    createClinician,
    createPatient,
    deletePatient,
    getAdmin,
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
    .get(
        [authenticateUser, authorizePermission('Clinician', 'Admin')],
        getPatients
    )

router
    .route('/clinician')
    .get(
        [authenticateUser, authorizePermission('Clinician', 'Admin')],
        getClinician
    )
    .post([authenticateUser, authorizePermission('Admin')], createClinician)
    .patch([authenticateUser, authorizePermission('Admin')], updateClinician)

router
    .route('/admin')
    .get([authenticateUser, authorizePermission('Admin')], getAdmin)

router
    .route('/getclinicians')
    .get([authenticateUser, authorizePermission('Admin')], getClinicians)

export default router
