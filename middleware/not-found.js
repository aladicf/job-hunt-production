import { StatusCodes } from 'http-status-codes'

// Defining a middleware function to handle requests to non-existent routes
const notFoundMiddleware = (req, res) =>
    // Sending a Not Found status code and a message indicating that the page does not exist
    res.status(StatusCodes.NOT_FOUND).send('Page does not exist')

export default notFoundMiddleware
