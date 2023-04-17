
import { BadRequestError } from '../errors/index.js'

// Defining a function to validate the login fields
const validateLoginFields = (email, password) => {
    // Checking if all values are provided
    if (!email || !password) {
        // Throwing an error if any value is missing
        throw new BadRequestError('Please provide all values')
    }

    // Validate email format using a regular expression
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
        // Throwing an error if the email format is invalid
        throw new BadRequestError('Invalid email format')
    }
}

export default validateLoginFields
