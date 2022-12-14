import express from 'express'
const router = express.Router() 
import {register,login,updateUser, verification,loginAdmin, getAllUsers} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/verification').post(verification)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/admin').post(loginAdmin).get(getAllUsers)
export default router