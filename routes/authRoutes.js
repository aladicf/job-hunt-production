import express from 'express'

const router = express.Router()

import rateLimiter from 'express-rate-limit'

const apiRateLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5,
	message: 'Too many failed login attempts, please try again in 15 minutes',
})

import {
	register,
	login,
	updateUser,
	getCurrentUser,
	logout,
} from '../controllers/authController.js'

import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'

router.route('/register').post(apiRateLimiter, register)
router.route('/login').post(apiRateLimiter, login)
router.get('/logout', logout)

router.route('/updateUser').patch(authenticateUser, testUser, updateUser)
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser)

export default router
