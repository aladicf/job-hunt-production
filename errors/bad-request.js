import CustomAPIError from './custom-api.js'
import { StatusCodes } from 'http-status-codes'

// Define a BadRequestError class that extends the CustomAPIError class
class BadRequestError extends CustomAPIError {
  // Define the class constructor
  constructor(message) {
    // Call the super constructor with the message parameter
    super(message)
    // Set the statusCode property of the instance to StatusCodes.BAD_REQUEST (HTTP status code 400)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default BadRequestError
