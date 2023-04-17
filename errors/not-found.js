import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.js'

// Define a NotFoundError class that extends the CustomAPIError class
class NotFoundError extends CustomAPIError {
  // Define the class constructor
  constructor(message) {
    // Call the super constructor with the message parameter
    super(message)
    // Set the statusCode property of the instance to StatusCodes.NOT_FOUND (HTTP status code 404)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export default NotFoundError
