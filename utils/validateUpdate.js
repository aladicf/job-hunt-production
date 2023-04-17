
import { BadRequestError } from '../errors/index.js'

// Defining a function to validate the update fields
const validateUpdateFields = (name, email, lastName, location) => {
    // Checking if all values are provided
    if (!name || !email || !lastName || !location) {
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

export default validateUpdateFieldselds
