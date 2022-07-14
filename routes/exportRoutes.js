import express from 'express'
import {
    patientExcel,
    clinicianExcel,
    adminExcel,
    patientPDF,
    adminPDF,
    clinicianPDF,
} from '../controllers/exportController.js'
import { authenticateUser } from '../middlewares/authentication.js'

const router = express.Router()

router.route('/excel/patient').post([authenticateUser], patientExcel)

router.route('/excel/clinician').post([authenticateUser], clinicianExcel)

router.route('/excel/admin').post([authenticateUser], adminExcel)

router.route('/pdf/patient').post([authenticateUser], patientPDF)

router.route('/pdf/clinician').post([authenticateUser], clinicianPDF)

router.route('/pdf/admin').post([authenticateUser], adminPDF)

export default router
