import express from 'express'
import {
    dailyTracker,
    healthHabit,
    questionOfTheDay,
} from '../controllers/trackerController.js'
import {
    authenticateUser,
    authorizePermission,
} from '../middlewares/authentication.js'

const router = express.Router()

router
    .route('/dailytracker')
    .post([authenticateUser, authorizePermission('Patient')], dailyTracker)

router
    .route('/healthhabit')
    .post([authenticateUser, authorizePermission('Patient')], healthHabit)

router
    .route('/questionoftheday')
    .get([authenticateUser, authorizePermission('Patient')], questionOfTheDay)

export default router
