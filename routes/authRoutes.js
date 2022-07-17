import express from 'express'
import {
    changeNewPassword,
    changePassword,
    getInfo,
    login,
    logout,
    sendChangePasswordUrl,
    signup,
} from '../controllers/authController.js'
import { authenticateUser } from '../middlewares/authentication.js'
const router = express.Router()

router.route('/signup').post(signup)

router.route('/login').post(login)

router.route('/changepassword').patch(authenticateUser, changePassword)

router.route('/logout').post(authenticateUser, logout)

router.route('/sendchangepasswordurl').post(sendChangePasswordUrl)

router.route('/changenewpassword').post(authenticateUser, changeNewPassword)

router.route('/getinfo').get(authenticateUser, getInfo)

export default router
