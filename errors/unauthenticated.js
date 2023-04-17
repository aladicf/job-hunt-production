import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.js'

// Define an UnAuthenticatedError class that extends the CustomAPIError class
class UnAuthenticatedError extends CustomAPIError {
  // Define the class constructor
  constructor(message) {
    // Call the super constructor with the message parameter
    super(message)
    // Set the statusCode property of the instance to StatusCodes.UNAUTHORIZED (HTTP status code 401)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default UnAuthenticatedError
