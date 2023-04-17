import express from 'express'

const router = express.Router()

import rateLimiter from 'express-rate-limit'

// Creating a rate limiter for the API
const apiRateLimiter = rateLimiter({
    // Setting the time window to 15 minutes
    windowMs: 15 * 60 * 1000,
    // Setting the maximum number of requests to 5
    max: 5,
    // Setting the message to be displayed when the limit is exceeded
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

// Defining the routes for registering and logging in a user
router.route('/register').post(apiRateLimiter, register)
router.route('/login').post(apiRateLimiter, login)
// Defining the route for logging out a user
router.get('/logout', logout)

// Defining the routes for updating and getting the current user
router.route('/updateUser').patch(authenticateUser, testUser, updateUser)
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser)

export default router
