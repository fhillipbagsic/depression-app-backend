import express from 'express'
import {
    dailyTracker,
    getDailyTracker,
    getHealthHabit,
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
    .get([authenticateUser], getDailyTracker)
    .post([authenticateUser, authorizePermission('Patient')], dailyTracker)

router
    .route('/healthhabit')
    .get([authenticateUser], getHealthHabit)
    .post([authenticateUser, authorizePermission('Patient')], healthHabit)

router
    .route('/questionoftheday')
    .get([authenticateUser, authorizePermission('Patient')], questionOfTheDay)

export default router
