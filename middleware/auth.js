import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'

// Define an asynchronous authentication middleware function
const auth = async (req, res, next) => {
  // Extract the token from the request cookies
  const { token } = req.cookies

  // If the token is not present, throw an error
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }

  try {
    // Verify the token using the JWT secret
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    // Check if the user ID matches a test user ID
    const testUser = userId === '632e174872f0ece71576ef06'

    // Add the user ID and testUser flag to the request object
    req.user = { userId, testUser }

    // Call the next middleware function
    next()
  } catch (error) {
    // If an error occurs while verifying the token, throw an error
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}

export default auth
