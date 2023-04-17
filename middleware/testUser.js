import { BadRequestError } from '../errors/index.js'

// Defining a middleware function to check if the user is a test user
const testUser = (req, res, next) => {
    // Checking if the user is a test user
    if (req.user.testUser) {
        // Throwing an error if the user is a test user
        throw new BadRequestError('Test user is read only mode for this page !')
    }
    // Calling the next middleware function in the stack
    next()
}

export default testUser
