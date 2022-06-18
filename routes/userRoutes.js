import express from 'express'
import {
    createClinician,
    createPatient,
} from '../controllers/userController.js'
import {
    authenticateUser,
    authorizePermission,
} from '../middlewares/authentication.js'

const router = express.Router()

router
    .route('/patient')
    .post([authenticateUser, authorizePermission('Clinician')], createPatient)

router.route('/clinician').post(createClinician)

export default router
