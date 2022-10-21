import express from 'express'
const router = express.Router() 
import {register,login,updateUser, verification} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/verification').post(verification)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)

export default router