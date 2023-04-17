import { StatusCodes } from 'http-status-codes'

// Defining an error handling middleware function
const errorHandlerMiddleware = (err, req, res, next) => {
    // Creating a default error object
    const defaultError = {
        // Setting the default status code and message
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later',
    }

    // Checking if the error is a validation error
    if (err.name === 'ValidationError') {
        // Setting the status code to Bad Request
        defaultError.statusCode = StatusCodes.BAD_REQUEST

        // Setting the message to the validation error messages
        defaultError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
    }

    // Checking if the error is a duplicate key error
    if (err.code && err.code === 11000) {
        // Setting the status code to Bad Request
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        // Setting the message to indicate that a field has to be unique
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
    }

    // Sending the error response
    res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware
