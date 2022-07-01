import express from 'express'
import {
    changePassword,
    getInfo,
    login,
    logout,
    signup,
} from '../controllers/authController.js'
import { authenticateUser } from '../middlewares/authentication.js'
const router = express.Router()

router.route('/signup').post(signup)

router.route('/login').post(login)

router.route('/changepassword').patch(authenticateUser, changePassword)

router.route('/logout').post(authenticateUser, logout)

router.route('/getinfo').get(authenticateUser, getInfo)

export default router
