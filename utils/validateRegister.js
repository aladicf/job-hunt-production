
import { BadRequestError } from '../errors/index.js'

// Defining a function to validate the registration fields
const validateRegisterFields = (name, email, password,) => {
    // Checking if all values are provided
    if (!name || !email || !password) {
        // Throwing an error if any value is missing
        throw new BadRequestError('Please provide all values')
    }

    // Validate email format using a regular expression
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
        // Throwing an error if the email format is invalid
        throw new BadRequestError('Invalid email format')
    }

     // Check if the password is at least 8 characters long
    if (password.length < 8) {
        // If the password is too short, throw an error
        throw new BadRequestError('Password must be at least 8 characters')
    }

    // Check if the password contains at least one uppercase letter, one lowercase letter, and one number
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        // If the password does not meet these requirements, throw an error
        throw new BadRequestError('Password must contain at least one uppercase letter, one lowercase letter, and one number')
    }
}

export default validateRegisterFields
